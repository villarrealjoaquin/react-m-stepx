import { useState } from "react";
import { localStorageManager } from "../logic/local-storage-manager";
import { retrieveFromStorage } from "../logic/retrieveFromStorage";
import { localStorageKeys } from "../models/local-storage-keys";
import { createStepsWithProps } from "../logic/createStepsWithProps";

export default function useMStepx(steps: JSX.Element[], save: boolean) {
  const [currentStep, setCurrentStep] = useState<number>(retrieveFromStorage(0, localStorageKeys.STEP));
  const [fields, setFields] = useState<Record<string, unknown>>(retrieveFromStorage({}, localStorageKeys.FIELDS));

  const updateFields = (data: Record<string, unknown>) => {
    const updateFields = {
      ...fields,
      ...data,
    };
    setFields(updateFields);
    if (save) localStorageManager.setInLocalStorage(localStorageKeys.FIELDS, updateFields);
  }

  const nextStep = () => {
    if (currentStep + 1 < steps.length) {
      const stepIndex = (i: number) => i + 1
      if (save) localStorageManager.setInLocalStorage(localStorageKeys.STEP, stepIndex(currentStep));
      setCurrentStep(stepIndex);
    }
  };

  const backStep = () => {
    if (currentStep > 0) {
      const stepIndex = (i: number) => i - 1
      if (save) localStorageManager.setInLocalStorage(localStorageKeys.STEP, stepIndex(currentStep));
      setCurrentStep(stepIndex);
    }
  };

  steps = createStepsWithProps(steps, {
    updateFields,
    fields,
  });

  return {
    step: steps[currentStep],
    fields,
    currentStep,
    backStep,
    nextStep,
  };
}