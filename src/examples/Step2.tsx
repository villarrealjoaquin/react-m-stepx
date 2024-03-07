
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
      <input type="text" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} name="street" />
      <label htmlFor="">Country</label>
      <input type="text" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} name="country" />
      <label htmlFor="">City</label>
      <input type="text" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} name="city" />
      {JSON.stringify(fields, null, 2)}
      {/* <button onClick={nextStepx}>Next Step</button>
      <button onClick={props.backStep}>Back Step</button> */}
    </div>
  )
}