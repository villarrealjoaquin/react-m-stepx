// import { lazy, Suspense } from 'react';
// import { useStepx } from '../hooks/useStepx';

// interface MStepxLazyProps {
//   steps: (() => Promise<{ default: React.ComponentType<unknown> }>)[]; 
//   overlay?: boolean;
//   className?: string;
// }

// export default function MStepxLazy({ steps, overlay, className = '' }: MStepxLazyProps) {
//   const { getCurrentStep } = useStepx();

//   const StepLazy = lazy(() => steps[getCurrentStep()]());

//   return (
//     <div className={`${overlay ? 'overlay' : ''} ${className}`}>
//       <Suspense fallback={<div>Loading...</div>}>
//         <StepLazy />
//       </Suspense>
//     </div>
//   );
// }

