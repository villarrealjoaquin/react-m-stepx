import React, { ReactNode } from "react";

export const createStepsWithProps = (steps: ReactNode[], props: Record<string, unknown>) => {
  return React.Children.map(steps, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
  });
};