import { useEffect, useRef } from "react";

export function useRoot() {
  const portalRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const portalRoot = document.createElement("div");
    document.body.appendChild(portalRoot);
    portalRootRef.current = portalRoot;

    return () => {
      if (portalRootRef.current) {
        document.body.removeChild(portalRootRef.current);
        portalRootRef.current = null;
      }
    };
  }, []);

  // portalRootRef.current?.setAttribute("role", "dialog");

  return { portalRoot: null };
}