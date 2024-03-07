import React, { useCallback, useState } from "react";
import ReactDOM from 'react-dom';
import { useRoot } from "../hooks";
import { localStorageManager } from "../logic/local-storage-manager";
import { retrieveFromStorage } from "../logic/retrieveFromStorage";
import { localStorageKeys } from "../models/local-storage-keys";

type ContextModal = {
  open: boolean;
  currentStep: number;
  onOpen: React.MouseEventHandler<HTMLButtonElement>;
  onCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

type ContextPortal = {
  save: boolean;
  onNextStep: () => void;
  onBackStep: () => void;
}

const CONSUMER_MODAL = 'useModalContext';
const CONSUMER_STEPX = 'useStepxContext';

function createContext<T>(providerName: string) {
  const Context = React.createContext<T | null>(null);

  function Provider({ children, ...props }: { children: React.ReactNode } & T) {
    return <Context.Provider value={props as T}>{children}</Context.Provider>;
  }

  function useContext(consumer: string) {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(consumer + ' must be used within a ' + providerName);
    }
    return context;
  }
  return [Provider, useContext] as const;
}

const [ModalProvider, useModalContext] = createContext<ContextModal>('ModalProvider');

export function ModalStepx({ children }: { children: React.ReactNode }) {
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

export function Portal({ children }: { children: React.ReactNode }) {
  const { portalRoot } = useRoot();
  const { open } = useModalContext(CONSUMER_MODAL);

  return open && portalRoot
    ? ReactDOM.createPortal(
      <div role="dialog relative">
        {children}
      </div>
      , portalRoot)
    : null;
}

const [StepxProvider, useStepxContext] = createContext<ContextPortal>('StepxProvider');

function Stepx({
  steps = [], save = false, children
}: {
  steps: React.ReactElement[], save?: boolean, children: React.ReactNode
}) {
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
    <StepxProvider onNextStep={nextStep} onBackStep={backStep} save={null}>
      <>
        {steps[currentStep]}
        {children}
      </>
    </StepxProvider>
  );
}

type ButtonProps<T extends HTMLElement = HTMLButtonElement> = React.ButtonHTMLAttributes<T> & {
  children: React.ReactNode;
};

function Next({ children, ...props }: ButtonProps) {
  const contextPortal = useStepxContext(CONSUMER_STEPX);
  return <button
    onClick={contextPortal.onNextStep}
    {...props}
  >
    {children}
  </button>
}

function Back({ children, ...props }: ButtonProps) {
  const contextPortal = useStepxContext(CONSUMER_STEPX);
  return <button
    onClick={contextPortal.onBackStep}
    {...props}
  >
    {children}
  </button>
}

export function Trigger({ children }: { children: React.ReactNode }) {
  const contextModal = useModalContext(CONSUMER_MODAL);
  if (contextModal.open) return <></>;
  return <button onClick={contextModal.onOpen}>{children}</button>
}

export function ClosePortal({ children }: { children: React.ReactNode }) {
  const context = useModalContext(CONSUMER_MODAL);
  if (!context.open) return null;
  return (
    <>
      <div className="w-full flex justify-center">
        <button className="text-red-500 m-auto" onClick={context.onOpen}>{children}</button>
      </div>
    </>
  );
}

ModalStepx.Portal = Portal;
ModalStepx.Open = Trigger;
ModalStepx.Close = ClosePortal;
ModalStepx.Stepx = Stepx;
ModalStepx.Next = Next;
ModalStepx.Back = Back;

// const rootModal = Object.assign(ModalStepx, {});
const MODAL_NAME = 'MStepxContainer'
ModalStepx.displayName = MODAL_NAME;

export { ModalStepx as Modal };

