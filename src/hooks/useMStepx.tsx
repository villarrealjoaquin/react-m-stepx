import React, { ReactNode, useState } from "react";

const localStorageUtility = {
  setInLocalStorage<T>(name: string, data: T): void {
    localStorage.setItem(name.toString(), JSON.stringify(data));
  },
  getInLocalStorage<T>(name: string): T | null {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) as T : null;
  },
  clearLocalStorage(): void {
    localStorage.clear();
  },
  existInLocalStorage(name: string): boolean {
    return !!localStorage.getItem(name.toString());
  },
};

const createStepsWithProps = (steps: ReactNode[], props: Record<string, unknown>) => {
  return React.Children.map(steps, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
  });
};

export default function useMStepx(steps: JSX.Element[], save: boolean) {
  const [currentStep, setCurrentStep] = useState<number>((): number => {
    const existCurrentStepInLocalStorage = localStorageUtility.existInLocalStorage('step');
    return existCurrentStepInLocalStorage ? localStorageUtility.getInLocalStorage('step') : 0;
  });
  const [fields, setFields] = useState<Record<string, unknown>>(() => {
    const existFields = localStorageUtility.existInLocalStorage('fields');
    return existFields ? localStorageUtility.getInLocalStorage('fields') : {};
  });

  const updateData = (data: Record<string, unknown>) => {
    const updateFields = {
      ...fields,
      ...data,
    };
    setFields(updateFields);
    if (save) localStorageUtility.setInLocalStorage('fields', updateFields);
  }

  const nextStep = () => {
    if (currentStep + 1 < steps.length) {
      const stepIndex = (i: number) => i + 1
      if (save) localStorageUtility.setInLocalStorage('step', stepIndex(currentStep));
      setCurrentStep(stepIndex);
    }
  };

  const backStep = () => {
    if (currentStep > 0) {
      const stepIndex = (i: number) => i - 1
      if (save) localStorageUtility.setInLocalStorage('step', stepIndex(currentStep));
      setCurrentStep(stepIndex);
    }
  };

  steps = createStepsWithProps(steps, {
    updateData,
    nextStep,
    backStep,
    fields,
  });

  return {
    step: steps[currentStep],
    fields,
    currentStep,
  };
}