import React, { useCallback, useState } from "react";
import ReactDOM from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';
import { styles } from "../constants";
import { createContext } from "../context";
import { useRoot } from "../hooks";
import { localStorageManager } from "../logic/local-storage-manager";
import { retrieveFromStorage } from "../logic/retrieveFromStorage";
import { localStorageKeys } from "../models/local-storage-keys";
import Overlay from "./Overlay";

type ContextModal = {
  open: boolean;
  currentStep: number;
  onOpen: React.MouseEventHandler<HTMLButtonElement>;
  onCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

type ContextPortal = {
  length: number;
  overlay?: boolean;
  onNextStep: () => void;
  onBackStep: () => void;
}

const CONSUMER_MODAL = 'useModalContext';
const CONSUMER_STEPX = 'useStepxContext';

const [ModalProvider, useModalContext] = createContext<ContextModal>('ModalProvider');

function ModalStepx({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(retrieveFromStorage<number>(0, localStorageKeys.STEP));

  const handleCurrentStepClick = (currentStep: number) => {
    setCurrentStep(currentStep);
  };

  const handlePortalToggle = () => {
    setOpen(() => !open);
  };
  return (
    <ModalProvider
      open={open}
      onOpen={handlePortalToggle}
      currentStep={currentStep}
      onCurrentStep={handleCurrentStepClick}
    >
      {children}
    </ModalProvider>
  );
}

interface PortalProps {
  children: React.ReactNode;
  overlay: boolean;
  scrollLock?: boolean;
}

function Portal({ overlay, children }: PortalProps) {
  const { portalRoot } = useRoot();
  const { open } = useModalContext(CONSUMER_MODAL);

  const overlayStyles: Record<string, unknown> = overlay
    ? styles
    : null

  return open && portalRoot
    ? ReactDOM.createPortal(
      <>
        <Overlay style={overlayStyles} />
        <RemoveScroll>
          <div
            role="dialog"
            className="flex flex-col bg-white relative z-10 p-4 mx-auto my-8 rounded-lg shadow-md"
            aria-modal="true"
            hidden={!open}
          >
            {children}
          </div>
        </RemoveScroll>
      </>
      , portalRoot)
    : null;
}

const [StepxProvider, useStepxContext] = createContext<ContextPortal>('StepxProvider');

type StepxForm = React.HTMLAttributes<HTMLFormElement> &
{ steps: React.ReactNode[], children: React.ReactNode, save?: boolean };

function Stepx({ steps = [], save = false, children, ...props }: StepxForm) {
  const [fields, setFields] = useState(retrieveFromStorage<Record<string, unknown>>({}, localStorageKeys.FIELDS));
  const { currentStep, onCurrentStep } = useModalContext(CONSUMER_MODAL);

  const nextStep = useCallback(() => {
    if (currentStep + 1 < steps.length) {
      if (save) localStorageManager.setInLocalStorage(localStorageKeys.STEP, currentStep + 1);
      onCurrentStep((i) => i + 1);
    }
  }, [currentStep, onCurrentStep, steps.length, save]);

  const backStep = useCallback(() => {
    if (currentStep > 0) {
      if (save) localStorageManager.setInLocalStorage(localStorageKeys.STEP, currentStep - 1);
      onCurrentStep((i) => i - 1);
    }
  }, [currentStep, onCurrentStep, save]);

  if (!Array.isArray(steps) || React.Children.toArray(steps).length === 0) {
    return <p>No steps provided or steps is not an array.</p>
  }

  const updateFields = (data: Record<string, unknown>) => {
    const update = {
      ...(typeof fields === 'object' ? fields : {}),
      ...data,
    };
    setFields(update);
    if (save) localStorageManager.setInLocalStorage(localStorageKeys.FIELDS, update);
  };

  steps = React.Children.map(steps, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(
        child as React.ReactElement<any, string | React.JSXElementConstructor<any>>,
        { fields, updateFields, currentStep }
      )
    }
  });

  if (!steps[currentStep]) return null;
  return (
    <StepxProvider onNextStep={nextStep} onBackStep={backStep} length={steps.length}>
      <form {...props}>
        {steps[currentStep]}
        {children}
      </form>
    </StepxProvider>
  );
}

type ButtonProps<T extends HTMLElement = HTMLButtonElement> = React.ButtonHTMLAttributes<T> & {
  children: React.ReactNode;
  deleteInFirstStep?: boolean;
  disabledInFirstStep?: boolean;
};

function Next({ children, ...props }: ButtonProps) {
  const contextStepx = useStepxContext(CONSUMER_STEPX);
  const contextModal = useModalContext(CONSUMER_MODAL);
  if (contextModal.currentStep === contextStepx.length - 1) return null;
  return (
    <button
      type="button"
      onClick={contextStepx.onNextStep}
      {...props}
    >
      {children}
    </button>
  )
}

function Back({ children, deleteInFirstStep, disabledInFirstStep, ...props }: ButtonProps) {
  const contextPortal = useStepxContext(CONSUMER_STEPX);
  const contextModal = useModalContext(CONSUMER_MODAL);
  if (deleteInFirstStep && contextModal.currentStep === 0) return null;

  return (
    <button
      type="button"
      onClick={contextPortal.onBackStep}
      disabled={disabledInFirstStep && contextModal.currentStep === 0}
      {...props}
    >
      {children}
    </button>
  )
}

function Submit({ children, ...props }: ButtonProps) {
  const contextStepx = useStepxContext(CONSUMER_STEPX);
  const contextModal = useModalContext(CONSUMER_MODAL);
  let submit = false;
  if (contextModal.currentStep === contextStepx.length - 1) {
    submit = true;
  }
  return (
    submit
      ? <button {...props}>{children}</button>
      : null
  )
}

function Trigger({ children, ...props }: ButtonProps) {
  const contextModal = useModalContext(CONSUMER_MODAL);
  if (contextModal.open) return <></>;
  return (
    <button
      type="button"
      onClick={contextModal.onOpen}
      {...props}
    >
      {children}
    </button>
  )
}

function ClosePortal({ children, ...props }: ButtonProps) {
  const context = useModalContext(CONSUMER_MODAL);
  if (!context.open) return null;
  return (
    <>
      <button
        type="button"
        className="text-red-500 m-auto"
        onClick={context.onOpen}
        {...props}>
        {children}
      </button>
    </>
  );
}

ModalStepx.Portal = Portal;
ModalStepx.Open = Trigger;
ModalStepx.Close = ClosePortal;
ModalStepx.Stepx = Stepx;
ModalStepx.Next = Next;
ModalStepx.Back = Back;
ModalStepx.Submit = Submit;

// const rootModal = Object.assign(ModalStepx, {});
const MODAL_NAME = 'MStepxContainer'
ModalStepx.displayName = MODAL_NAME;

export { ModalStepx as Modal };

