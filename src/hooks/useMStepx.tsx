import React, { useState } from "react";

export default function useMStepx(steps: JSX.Element[], showPortal?: () => void) {
  const [currentStep, setCurrentStep] = useState(0);
  const [fields, setFields] = useState({});

  const updateData = (data: Record<string, unknown>) => {
    setFields({
      ...fields,
      ...data,
    });
  }

  const nextStep = () => {
    if (currentStep + 1 < steps.length) {
      setCurrentStep(i => i + 1);
    }
  }

  const backStep = () => {
    if (currentStep > 0) {
      setCurrentStep(i => i - 1);
    }
  }

  steps = React.Children.map(steps, (child) => React.cloneElement(child, {
    updateData,
    nextStep,
    backStep,
    fields,
    showPortal,
  }));

  return {
    step: steps[currentStep],
    fields,
    currentStep,
  }
}