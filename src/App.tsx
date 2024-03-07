// import MStepxLazy from './components/MStepxLazy';
// import { MStepx } from './components';
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
  return (
    <>
      <div className="App">
        <h1 className="text-3xl font-bold underline">
          react-m-stepx
        </h1>
        <Modal>
          <Modal.Portal>
            <Modal.Stepx steps={STEPS} save={true}>
              <div className='flex justify-center gap-3'>
                <Modal.Back className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Back</Modal.Back>
                <Modal.Next className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</Modal.Next>
              </div>
              <Modal.Close>Close</Modal.Close>
            </Modal.Stepx>
            {/* <MStepx steps={STEPS} overlay={false} transition={{ duration: '0.5s', type: 'ease-in-out' }} /> */}
          </Modal.Portal>
          <Modal.Open>Open</Modal.Open>
        </Modal>
        {/* <MStepx steps={STEPS} overlay={false} transition={{ duration: '0.5s', type: 'ease-in-out' }} save /> */}
        {/* <button onClick={() => setIsPortalActive(!isPortalActive)}>open</button> */}
      </div>
    </>
  )
}

export default App


