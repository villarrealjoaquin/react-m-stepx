import useMStepx from "../hooks/useMStepx";

interface MStepxProps {
  steps: JSX.Element[];
  overlay?: boolean;
  className?: string;
  transition?: {
    duration?: string;
    type?: string;
  };
  open?: () => void;
}

export default function MStepx({ steps, overlay, className = '', transition, ...props }: MStepxProps) {
  const showPortal = props.open?.bind(null, "Hello");

  const { step, fields, currentStep } = useMStepx(steps, showPortal);

  const transitionStyles = transition
    ? {
      transitionDuration: transition.duration || '0.3s',
      transitionTimingFunction: transition.type || 'ease',
    }
    : {};

  return (
    <>
      <div key={currentStep} className={`${overlay ? 'overlay' : ''} ${className}`} style={transitionStyles}>
        {step}
      </div>
      <p>{JSON.stringify(fields)}</p>
    </>
  )
}