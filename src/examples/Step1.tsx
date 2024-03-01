import { useState } from "react";
import { useStepx } from "../hooks/useStepx";

export default function Step1() {
  const [data, setData] = useState({});
  const { updateData, nextStep } = useStepx();

  const nextStepx = () => {
    updateData(data);
    nextStep();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <div className="step">
        <label htmlFor="">name</label>
        <input type="text" onChange={handleChange} name="name" />
        <label htmlFor="">lastname</label>
        <input type="text" onChange={handleChange} name="lastname" />
        <label htmlFor="">email</label>
        <input type="email" onChange={handleChange} name="email" />
        <div>
          <button onClick={nextStepx}>Next Step</button>
        </div>
      </div>
    </>
  )
}