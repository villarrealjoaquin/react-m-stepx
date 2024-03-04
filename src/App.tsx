// import MStepxLazy from './components/MStepxLazy';
import { MStepx } from './components';
import { Modal } from './components/MStepxContainer';
import { Step1, Step2, Step3 } from './examples';

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
  // const { step, fields } = useMStepx(STEPS);

  // const toggleStep = () => {
  //   setIsPortalActive(!isPortalActive);
  // }

  // const handleCompleteForm = () => { }

  return (
    <>
      <div className="App">
        <h1>react-m-stepx</h1>
        <Modal>
          <Modal.Trigger>Open</Modal.Trigger>
          <Modal.Portal>
            <MStepx steps={STEPS} overlay={false} transition={{ duration: '0.5s', type: 'ease-in-out' }} />
          </Modal.Portal>
          <Modal.Close>Close</Modal.Close>
        </Modal>
        <MStepx steps={STEPS} overlay={false} transition={{ duration: '0.5s', type: 'ease-in-out' }} save />
        {/* <button onClick={() => setIsPortalActive(!isPortalActive)}>open</button> */}
      </div>
    </>
  )
}

export default App


