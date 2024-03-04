import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useRoot } from "../hooks";

interface ContextStepxProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Context = React.createContext<ContextStepxProps | null>(null);

const useContextStepx = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error('useStepx must be used within a StepProvider');
  }
  return context;
}

export function ModalStepx({ children }: { children: React.ReactNode }) {
  // const toggleStep = useRef();

  const [open, setOpen] = useState(false);

  return (
    <Context.Provider value={{ open, setOpen }}>
      {children}
    </Context.Provider>
  );
}

interface PortalProps {
  children: React.ReactNode;
}


export function Portal({ children }: PortalProps) {
  const { portalRoot } = useRoot();
  const { open } = useContextStepx();

  return open && portalRoot
    ? ReactDOM.createPortal(children, portalRoot)
    : null;
}

export function Trigger({ children }: PortalProps) {
  const { setOpen } = useContextStepx();

  return (
    <button onClick={() => setOpen(true)}>{children}</button>
  );
}

export function ClosePortal({ children }: PortalProps) {
  const { open, setOpen } = useContextStepx();

  if(!open) return null;

  return (
    <button onClick={() => setOpen(false)}>{children}</button>
  );
}

ModalStepx.Portal = Portal;
ModalStepx.Trigger = Trigger;
ModalStepx.Close = ClosePortal;
ModalStepx.displayName = 'MStepxContainer';

export { ModalStepx as Modal };

