import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function usePortal(root: HTMLDivElement | DocumentFragment | null, modal: ReactNode) {
  const _root = useRef<HTMLDivElement | DocumentFragment | null>(null);

  useEffect(() => {
    if (!root || !(root instanceof HTMLDivElement)) {
      _root.current = document.createElement("div");
    } else {
      _root.current = root;
    }

    document.body.appendChild(_root.current);

    createPortal(modal, _root.current);
  }, [root, modal]);

  return _root;
}
