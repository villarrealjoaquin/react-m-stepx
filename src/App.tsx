// import MStepxLazy from './components/MStepxLazy';
import { useState } from 'react';
import { MStepx } from './components';
import { Step1, Step2, Step3 } from './examples';
import Wrapper from './components/Wrapper';

// const stepsLazy = [
//   () => import('./examples/Step1'),
//   () => import('./examples/Step2'),
//   () => import('./examples/Step3'),
// ];

const STEPS = [
  <Step1 />,
  <Step2 />,
  <Step3 />,
]

function App() {
  const [isPortalActive, setIsPortalActive] = useState(false);
  // const { step, fields } = useMStepx(STEPS);

  const toggleStep = () => {
    setIsPortalActive(!isPortalActive);
  }

  // const handleCompleteForm = () => { }

  return (
    <>
      <div className="App">
        <h1>react-m-stepx</h1>
        <Wrapper onSubmit={() => { }} open={toggleStep} status={isPortalActive}>
          <MStepx steps={STEPS} overlay={false} transition={{ duration: '0.5s', type: 'ease-in-out' }} />
        </Wrapper>
        <button onClick={() => setIsPortalActive(!isPortalActive)}>open</button>
      </div>
    </>
  )
}

export default App


