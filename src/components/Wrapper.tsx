import React, { FormEvent } from "react";

interface Props {
  onSubmit: () => void;
  open?: () => void;
  children: React.ReactNode;
  status?: boolean;
}

export default function Wrapper({ onSubmit, open, status, children }: Props) {
  const showPortal = () => {
    open();
  }

  children = React.Children.map(children, (child) => React.cloneElement(child as React.ReactElement, { showPortal }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {status && children}
        {/* {children} */}
      </form>
    </>
  )
}