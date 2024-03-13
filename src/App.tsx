// import MStepxLazy from './components/MStepxLazy';
// import { MStepx } from './components';
import { Modal } from './components/MultiStepxModal';
import { Step1, Step2, Step3 } from './examplesWithDialog';

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <>
      <div className="App">
        <h1 className="text-3xl font-bold underline">
          react-m-stepx
        </h1>
        <Modal>
          <Modal.Portal scrollLock={true} overlay={true}>
            <div className='ml-auto'>
              <Modal.Close>Close</Modal.Close>
            </div>
            <Modal.Stepx className="m-auto" onSubmit={handleSubmit} steps={STEPS} save={true} >
              <div className='flex justify-center gap-3'>
                <Modal.Back deleteInFirstStep className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Back</Modal.Back>
                <Modal.Next className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</Modal.Next>
                <Modal.Submit className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</Modal.Submit>
              </div>
            </Modal.Stepx>
          </Modal.Portal>
          <Modal.Open>Open</Modal.Open>
        </Modal>
        {/* <MStepx steps={STEPS} overlay={false} transition={{ duration: '0.5s', type: 'ease-in-out' }} /> */}
        {/* <MStepx steps={STEPS} overlay={false} transition={{ duration: '0.5s', type: 'ease-in-out' }} save /> */}
        {/* <button onClick={() => setIsPortalActive(!isPortalActive)}>open</button> */}
      </div>
    </>
  )
}

export default App


