import { StepxProps } from "../types";

export default function Step2({ updateFields, fields }: any) {
  // const nextStepx = () => {
  //   props.nextStep();
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="step">
      <label htmlFor="">Street</label>
      <input type="text" onChange={handleChange} name="street" />
      <label htmlFor="">Country</label>
      <input type="text" onChange={handleChange} name="country" />
      <label htmlFor="">City</label>
      <input type="text" onChange={handleChange} name="city" />
      {JSON.stringify(fields, null, 2)}
      {/* <button onClick={nextStepx}>Next Step</button>
      <button onClick={props.backStep}>Back Step</button> */}
    </div>
  )
}