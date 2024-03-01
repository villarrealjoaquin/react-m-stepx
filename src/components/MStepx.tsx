import { ReactNode } from "react";
import { useStepx } from "../hooks/useStepx";

interface MStepxProps {
  steps: ReactNode[];
  overlay?: boolean;
  className?: string;
}

export default function MStepx({ steps, overlay, className = '' }: MStepxProps) {
  const { getCurrentStep } = useStepx();
  const currentStep = getCurrentStep();

  if (currentStep < 0 || currentStep >= steps.length) {
    return null;
  }

  return (
    <>
      <div className={`${overlay ? 'overlay' : ''} ${className}`}>
        {steps[currentStep]}
      </div>
    </>
  )
}