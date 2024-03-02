import { Step1, Step2, Step3 } from "../examples";
import { useStepx } from "../hooks/useStepx";
import MStepx from "./MStepx";

const STEPS = [
  <Step1 />,
  <Step2 />,
  <Step3 />,
]

export default function ContainerPortal() {
  const { getCurrentStep, toggleStep } = useStepx();

  return (
    <>
      <div>
        <span>
          {getCurrentStep() + 1}
        </span>
        <MStepx
          steps={STEPS}
          overlay={true}
          className='test'
        />
        <button onClick={toggleStep}>Close Modal</button>
      </div>
    </>
  )
}