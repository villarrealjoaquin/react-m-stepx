import { useContext } from "react";
import { StepContext } from "../utils/Provider/step-provider";

export const useStepx = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStepx must be used within a StepProvider');
  }
  return context;
}