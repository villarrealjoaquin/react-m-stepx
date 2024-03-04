import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useRoot } from "../hooks";

type ContextProviderProps<T> = {
  children: React.ReactNode;
} & T;

type ContextModal = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

type ContextPortal = {
  nextStep: () => void;
  backStep: () => void;
}

function createContext<T>() {
  const Context = React.createContext<T | null>(null);

  function Provider(props: ContextProviderProps<T>) {
    return <Context.Provider value={{ ...props }}>{props.children}</Context.Provider>;
  }

  function useContext() {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error('useStepx must be used within a StepProvider');
    }
    return context;
  }

  return [Provider, useContext] as const;
}

const [ModalProvider, useContextStepx] = createContext<ContextModal>();

export function ModalStepx({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <ModalProvider
      open={open}
      setOpen={setOpen}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
    >
      {children}
    </ModalProvider>
  );
}

const [PortalProvider, usePortalContext] = createContext<ContextPortal>();

export function Portal({ children }: { children: React.ReactNode }) {
  const { portalRoot } = useRoot();
  const { open, setCurrentStep } = useContextStepx();

  const nextStep = () => {
    setCurrentStep((i) => i + 1);
  };

  const backStep = () => {
    setCurrentStep((i) => i - 1);
  };

  return open && portalRoot
    ? ReactDOM.createPortal(
      <PortalProvider nextStep={nextStep} backStep={backStep}>
        <div role="dialog">
          {children}
        </div>
      </PortalProvider>
      , portalRoot)
    : null;
}

function Stepx({ children }: { children: React.ReactNode }) {
  const [fields, setFields] = useState({});
  const { currentStep } = useContextStepx();

  const updateFields = (data: Record<string, unknown>) => {
    setFields({
      ...fields,
      ...data,
    });
  };

  let stepsArray = React.Children.toArray(children);
  stepsArray = React.Children.map(children, (child) => {
    return React.cloneElement(child as React.ReactElement, { fields, updateFields });
  });

  if (!stepsArray[currentStep]) return null;
  return stepsArray[currentStep];
}

function Next({ children }: { children: React.ReactNode }) {
  const { nextStep } = usePortalContext();
  return (
    <button onClick={nextStep}>{children}</button>
  );
}

function Back({ children }: { children: React.ReactNode }) {
  const contextPortal = usePortalContext();
  return <button onClick={contextPortal.backStep}>{children}</button>;
}

export function Trigger({ children }: { children: React.ReactNode }) {
  const contextPortal = useContextStepx();
  return (
    <button onClick={() => contextPortal.setOpen(true)}>{children}</button>
  );
}

export function ClosePortal({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useContextStepx();
  if (!open) return null;
  return (
    <button onClick={() => setOpen(false)}>{children}</button>
  );
}

ModalStepx.Portal = Portal;
ModalStepx.Open = Trigger;
ModalStepx.Close = ClosePortal;
ModalStepx.Stepx = Stepx;
ModalStepx.Next = Next;
ModalStepx.Back = Back;
ModalStepx.displayName = 'MStepxContainer';

export { ModalStepx as Modal };
