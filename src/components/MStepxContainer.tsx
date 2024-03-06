import React, { JSXElementConstructor, useCallback, useState } from "react";
import ReactDOM from 'react-dom';
import { useRoot } from "../hooks";

type ContextModal = {
  open: boolean;
  currentStep: number;
  onOpen: React.MouseEventHandler<HTMLButtonElement>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

type ContextPortal = {
  onNextStep: () => void;
  onBackStep: () => void;
}

function createContext<T>(providerName: string) {
  const Context = React.createContext<T | null>(null);

  function Provider({ children, ...props }: { children: React.ReactNode } & T) {
    return <Context.Provider value={props as T}>{children}</Context.Provider>;
  }

  function useContext() {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error('useStepx must be used within a ' + providerName);
    }
    return context;
  }
  return [Provider, useContext] as const;
}

const [ModalProvider, useModalContext] = createContext<ContextModal>('ModalProvider');

export function ModalStepx({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <ModalProvider
      open={open}
      onOpen={() => setOpen(!open)}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
    >
      {children}
    </ModalProvider>
  );
}

const [StepxProvider, useStepxContext] = createContext<ContextPortal>('PortalProvider');

export function Portal({ children }: { children: React.ReactNode }) {
  const { portalRoot } = useRoot();
  const { open } = useModalContext();
  return open && portalRoot
    ? ReactDOM.createPortal(
      <div role="dialog">
        {children}
      </div>
      , portalRoot)
    : null;
}

function Stepx({ steps, children }: { steps: React.ReactElement[], children: React.ReactNode }) {
  const [fields, setFields] = useState({});
  const { currentStep, setCurrentStep } = useModalContext();

  const nextStep = useCallback(() => {
    setCurrentStep((i) => i + 1);
  }, []);

  const backStep = useCallback(() => {
    setCurrentStep((i) => i - 1);
  }, []);

  const updateFields = (data: Record<string, unknown>) => {
    setFields({
      ...fields,
      ...data,
    });
  };

  steps = React.Children.map(steps, (child) => {
    return React.cloneElement(
      child as React.ReactElement<any, string | JSXElementConstructor<any>>,
      { fields, updateFields, currentStep }
    );
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
  const contextPortal = useStepxContext();
  return <button onClick={contextPortal.onNextStep}>{children}</button>
}

function Back({ children }: { children: React.ReactNode }) {
  const contextPortal = useStepxContext();
  return <button onClick={contextPortal.onBackStep}>{children}</button>
}

export function Trigger({ children }: { children: React.ReactNode }) {
  const contextPortal = useModalContext();
  const contextStepx = useModalContext();
  if (contextStepx.open) return <></>;
  return <button onClick={contextPortal.onOpen}>{children}</button>
}

export function ClosePortal({ children }: { children: React.ReactNode }) {
  const { open, onOpen } = useModalContext();
  if (!open) return null;
  return (
    <button onClick={onOpen}>{children}</button>
  );
}

ModalStepx.Portal = Portal;
ModalStepx.Open = Trigger;
ModalStepx.Close = ClosePortal;
ModalStepx.Stepx = Stepx;
ModalStepx.Next = Next;
ModalStepx.Back = Back;

// const rootModal = Object.assign(ModalStepx, {});

ModalStepx.displayName = 'MStepxContainer';

export { ModalStepx as Modal };

