import { lazy, Suspense } from 'react';
import { useStepx } from '../hooks/useStepx';

interface MStepxProps {
  steps: (() => Promise<{ default: React.ComponentType<any> }>)[]; // Funciones de importación dinámica
  overlay?: boolean;
  className?: string;
}

export default function MStepxLazy({ steps, overlay, className = '' }: MStepxProps) {
  const { getCurrentStep } = useStepx();

  const StepLazy = lazy(() => steps[getCurrentStep()]());

  return (
    <div className={`${overlay ? 'overlay' : ''} ${className}`}>
      <Suspense fallback={<div>Loading...</div>}>
        <StepLazy />
      </Suspense>
    </div>
  );
}

