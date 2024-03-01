import { useState } from "react";
import { useStepx } from "../hooks/useStepx";

export default function Step2() {
  const [data, setData] = useState({});
  const { updateData, nextStep } = useStepx();

  const nextStepx = () => {
    updateData(data);
    nextStep();
    // dispath({ type: "NEXT_STEP" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="step">
      <label htmlFor="">Street</label>
      <input type="text" onChange={handleChange} name="street" />
      <label htmlFor="">Country</label>
      <input type="email" onChange={handleChange} name="country" />
      <label htmlFor="">City</label>
      <input type="text" onChange={handleChange} name="city" />
      <button onClick={nextStepx}>Next Step</button>
    </div>
  )
}