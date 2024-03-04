
export default function Step1({ updateFields, fields }: any) {
  // const nextStepx = () => {
  //   nextStep();
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({
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
      {JSON.stringify(fields, null, 2)}
      {/* <button onClick={nextStepx}>Next Step</button>
      <button onClick={backStep}>Back Step</button> */}
    </div>
  )
}