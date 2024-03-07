import React, { ReactNode, useState } from "react";
import { localStorageUtility } from "../logic/local-storage";
import { set } from "../logic/set";
import { localStorageKeys } from "../models/local-storage-keys";

const createStepsWithProps = (steps: ReactNode[], props: Record<string, unknown>) => {
  return React.Children.map(steps, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
  });
};

export default function useMStepx(steps: JSX.Element[], save: boolean) {
  const [currentStep, setCurrentStep] = useState<number>(set(0, localStorageKeys.STEP));
  const [fields, setFields] = useState<Record<string, unknown>>(set({}, localStorageKeys.FIELDS));

  const updateData = (data: Record<string, unknown>) => {
    const updateFields = {
      ...fields,
      ...data,
    };
    setFields(updateFields);
    if (save) localStorageUtility.setInLocalStorage(localStorageKeys.FIELDS, updateFields);
  }

  const nextStep = () => {
    if (currentStep + 1 < steps.length) {
      const stepIndex = (i: number) => i + 1
      if (save) localStorageUtility.setInLocalStorage(localStorageKeys.STEP, stepIndex(currentStep));
      setCurrentStep(stepIndex);
    }
  };

  const backStep = () => {
    if (currentStep > 0) {
      const stepIndex = (i: number) => i - 1
      if (save) localStorageUtility.setInLocalStorage(localStorageKeys.STEP, stepIndex(currentStep));
      setCurrentStep(stepIndex);
    }
  };

  steps = createStepsWithProps(steps, {
    updateData,
    nextStep,
    backStep,
    fields,
    currentStep,
  });

  return {
    step: steps[currentStep],
    fields,
    currentStep,
  };
}