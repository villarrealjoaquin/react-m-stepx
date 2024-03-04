import { StepxProps } from "../types";

export default function Step1({ nextStep, updateData, backStep }: StepxProps) {
  const nextStepx = () => {
    nextStep();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="step">
      <label htmlFor="">name</label>
      <input type="text" onChange={handleChange} name="name" />
      <label htmlFor="">lastname</label>
      <input type="text" onChange={handleChange} name="lastname" />
      <label htmlFor="">email</label>
      <input type="email" onChange={handleChange} name="email" />
      <button onClick={nextStepx}>Next Step</button>
      <button onClick={backStep}>Back Step</button>
    </div>
  )
}