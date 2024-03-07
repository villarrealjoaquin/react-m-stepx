import React from "react";

export function createContext<T>(providerName: string) {
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
