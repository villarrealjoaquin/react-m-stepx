interface MStepxProps {
  step: JSX.Element;
  submit: (data: any) => void;
  overlay?: boolean;
  className?: string;
  transition?: {
    duration?: string;
    type?: string;
  };
  save?: boolean;
  open?: () => void;
}

export default function MStepx({
  step,
  overlay,
  className = "",
  transition,
}: // save = false,
MStepxProps) {
  const transitionStyles = transition
    ? {
        transitionDuration: transition.duration || "0.3s",
        transitionTimingFunction: transition.type || "ease",
      }
    : {};

  return (
    <>
      <div
        className={`${overlay ? "overlay" : ""} ${className}`}
        style={transitionStyles}
      >
        {step}
      </div>
    </>
  );
}
