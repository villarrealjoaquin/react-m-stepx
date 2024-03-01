import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useRoot } from "../hooks";

interface PortalProps {
  children: ReactNode;
  open?: boolean;
}

export function Portal({ children, open = false }: PortalProps) {
  const { portalRoot } = useRoot();
  return open ? createPortal(children, portalRoot!) : null;
}