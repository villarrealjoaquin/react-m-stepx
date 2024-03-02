export interface StepxProps {
  children?: React.ReactNode;
  updateData?: (data: Record<string, unknown>) => void;
  nextStep?: () => void;
  backStep?: () => void;
}