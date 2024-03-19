export default function Step3({ updateFields, fields }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <div className="step">
        <label htmlFor="">step1</label>
        <input
          type="text"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={fields.step1}
          name="step1"
        />
        <label htmlFor="">step2</label>
        <input
          type="text"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          name="step2"
          value={fields.lastname}
        />
        <label htmlFor="">sdadas</label>
        <input
          type="text"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          name="sdadas"
        />
        {JSON.stringify(fields, null, 2)}

      </div>
    </>
  )
}