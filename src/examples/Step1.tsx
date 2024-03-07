
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
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Name
      </label>
      <input
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        value={fields.name}
        onChange={handleChange}
        name="name"
      />

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
        Lastname
      </label>
      <input
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="lastname"
        value={fields.lastname}
        type="text"
        onChange={handleChange}
        name="lastname"
      />

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        value={fields.email}
        type="email"
        onChange={handleChange}
        name="email"
      />

      <div className="mt-4">
        {JSON.stringify(fields, null, 2)}
      </div>

      {/* Botones (sin estilos Tailwind, descomentar si se quieren agregar) */}
      {/* <button onClick={nextStepx}>Next Step</button>
    <button onClick={backStep}>Back Step</button> */}
    </div>
  )
}