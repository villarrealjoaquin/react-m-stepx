import { MStepx } from './components';
import Data from './components/Data';
import MStepxLazy from './components/MStepxLazy';
import { Portal } from './components/Portal';
import { Step1, Step2, Step3 } from './examples';
import { useStepx } from './hooks/useStepx';

const STEPS = [
  <Step1 />,
  <Step2 />,
  <Step3 />,
]

const stepsLazy = [
  () => import('./examples/Step1'),
  () => import('./examples/Step2'),
  () => import('./examples/Step3'),
];

function App() {
  const { isPortalActive, toggleStep } = useStepx();

  return (
    <>
      <div className="App">
        <h1>react-m-stepx</h1>
        <Portal open={isPortalActive}>
          <MStepx
            steps={STEPS}
            overlay={false}
            className='test'
          />
        </Portal>
        <button>X</button>
        <button onClick={toggleStep}>open modal</button>
        <Data />
        <MStepxLazy steps={stepsLazy} overlay={false} />
      </div>
    </>
  )
}

export default App
