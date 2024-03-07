import React, { JSXElementConstructor, useCallback, useState } from "react";
import ReactDOM from 'react-dom';
import { useRoot } from "../hooks";
import { localStorageUtility } from "../logic/local-storage";
import { set } from "../logic/set";
import { localStorageKeys } from "../models/local-storage-keys";

type ContextModal = {
  open: boolean;
  currentStep: number;
  onOpen: React.MouseEventHandler<HTMLButtonElement>;
  onCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

type ContextPortal = {
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
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(set<number>(0, localStorageKeys.STEP));
  const handleCurrentStepClick = (currentStep: number) => {
    setCurrentStep(currentStep);
  };
  return (
    <ModalProvider
      open={open}
      onOpen={() => setOpen(!open)}
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
      <div role="dialog">
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
  const [fields, setFields] = useState(set<Record<string, unknown>>({}, localStorageKeys.FIELDS));
  const { currentStep, onCurrentStep } = useModalContext(CONSUMER_MODAL);

  const nextStep = useCallback(() => {
    if (currentStep + 1 < steps.length) {
      if (save) localStorageUtility.setInLocalStorage(localStorageKeys.STEP, currentStep + 1);
      onCurrentStep((i) => i + 1);
    }
  }, [currentStep, onCurrentStep, steps.length, save]);

  const backStep = useCallback(() => {
    if (currentStep > 0) {
      if (save) localStorageUtility.setInLocalStorage(localStorageKeys.STEP, currentStep - 1);
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
    if (save) localStorageUtility.setInLocalStorage(localStorageKeys.FIELDS, update);
  };

  steps = React.Children.map(steps, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(
        child as React.ReactElement<any, string | JSXElementConstructor<any>>,
        { fields, updateFields, currentStep }
      )
    }
  });

  if (!steps[currentStep]) return null;
  return (
    <StepxProvider onNextStep={nextStep} onBackStep={backStep}>
      <>
        {steps[currentStep]}
        {children}
      </>
    </StepxProvider>
  );
}

function Next({ children }: { children: React.ReactNode }) {
  const contextPortal = useStepxContext(CONSUMER_STEPX);
  return <button onClick={contextPortal.onNextStep}>{children}</button>
}

function Back({ children }: { children: React.ReactNode }) {
  const contextPortal = useStepxContext(CONSUMER_STEPX);
  return <button onClick={contextPortal.onBackStep}>{children}</button>
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
    <button onClick={context.onOpen}>{children}</button>
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

