import { useState } from "react";
import { useStepx } from "../hooks/useStepx";

export default function Step3() {
  const [data, setData] = useState({});
  const { updateData, getAllInfo, nextStep } = useStepx();

  const nextStepx = () => {
    updateData(data);
    nextStep();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    // dispath({ type: "UPDATE_DATA", payload: { [e.target.name]: e.target.value } })
  }

  console.log(getAllInfo());


  return (
    <>
      <div>
        <label htmlFor="">name</label>
        <input type="text" onChange={handleChange} name="name" />
        <label htmlFor="">lastname</label>
        <input type="text" onChange={handleChange} name="lastname" />
        <label htmlFor="">email</label>
        <input type="email" onChange={handleChange} name="email" />
        <button onClick={nextStepx}>Next Step</button>
      </div>
    </>
  )
}