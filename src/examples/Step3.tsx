import { useState } from "react";

export default function Step3(props) {
  const [data, setData] = useState({});

  const nextStepx = () => {
    props.updateData(data);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

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