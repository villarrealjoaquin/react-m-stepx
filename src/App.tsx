import { MStepx } from './components';
import Data from './components/Data';
import { Portal } from './components/Portal';
import { Step1, Step2, Step3 } from './examples';
import { useStepx } from './hooks/useStepx';

const STEPS = [
  <Step1 />,
  <Step2 />,
  <Step3 />,
]

function App() {
  const { isPortalActive, toggleStep } = useStepx();

  return (
    <>
      <div className="App">
        <h1>react-m-stepx</h1>
        <Portal open={isPortalActive}>
          <MStepx
            steps={STEPS}
            overlay={true}
            className='test'
          />
        </Portal>
        <button>X</button>
        <button onClick={toggleStep}>open modal</button>
        <Data />
      </div>
    </>
  )
}

export default App
