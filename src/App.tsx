// import MStepxLazy from './components/MStepxLazy';
// import { MStepx } from './components';
// import { Modal } from "./components/MultiStepxModal";
import { Formx, MStepx } from "./components";
import StepOne from "./examples/StepOne";
import StepThree from "./examples/StepThree";
import StepTwo from "./examples/StepTwo";
import { useMStepx } from "./hooks";
// import { Step1, Step2, Step3 } from "./examplesWithDialog";

// const stepsLazy = [
//   () => import('./examples/Step1'),
//   () => import('./examples/Step2'),
//   () => import('./examples/Step3'),
// ];

// const STEPS = [<Step1 />, <Step2 />, <Step3 />];
const STEPS = [<StepOne />, <StepTwo />, <StepThree />];

// const STEPS_LAZY = [
//   () => import('./examplesWithDialog/Step1'),
//   () => import('./examplesWithDialog/Step2'),
//   () => import('./examplesWithDialog/Step3'),
// ]

function App() {
  const { step, backStep, nextStep, fields } = useMStepx(STEPS, true);

  const handleCompleteForm = () => {
    console.log(fields);
  };

  return (
    <>
      <div className="App">
        <h1 className="text-3xl font-bold underline">react-m-stepx</h1>
        <Formx submit={handleCompleteForm}>
          <MStepx step={step} submit={handleCompleteForm} />
          <div>
            <button type="button" onClick={backStep}>
              back
            </button>
            <button type="button" onClick={nextStep}>
              next
            </button>
          </div>
        </Formx>
        <form onSubmit={handleCompleteForm}></form>
        <p>{JSON.stringify(fields)}</p>

        {/* <div className='w-[300px] h-[300px] bg-red-400'></div> */}
        {/* <Modal>
          <Modal.Portal scrollLock={true} overlay={true}>
            <div className="ml-auto">
              <Modal.Close>Close</Modal.Close>
            </div>
            <Modal.Stepx
              className="m-auto"
              submit={handleCompleteForm}
              steps={STEPS}
              save={true}
            >
              <div className="flex justify-center gap-3">
                <Modal.Back
                  deleteInFirstStep
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Back
                </Modal.Back>
                <Modal.Next className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Next
                </Modal.Next>
                <Modal.Submit className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </Modal.Submit>
              </div>
            </Modal.Stepx>
          </Modal.Portal>
          <Modal.Open>Open</Modal.Open>
        </Modal> */}
      </div>
    </>
  );
}

export default App;
