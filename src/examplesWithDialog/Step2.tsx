export default function Step2({ updateFields, fields }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="step">
      <label htmlFor="">Street</label>
      <input
        type="text"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange}
        name="street"
        value={fields.street}
      />
      <label htmlFor="">Country</label>
      <input
        type="text"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange}
        name="country"
        value={fields.country}
      />
      <label htmlFor="">City</label>
      <input
        type="text"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={handleChange}
        name="city"
        value={fields.city}
      />
      {JSON.stringify(fields, null, 2)}
    </div>
  )
}