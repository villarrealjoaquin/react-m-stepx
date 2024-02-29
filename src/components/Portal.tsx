import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePortal } from "../hooks";

interface PortalProps {
  children: ReactNode;
  open?: boolean;
}

export function Portal({ children, open = false }: PortalProps) {
  const { portalRoot } = usePortal();
  return open ? createPortal(children, portalRoot!) : null;
}