export default function StepOne({ updateFields, fields }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <h2 className="text-2xl font-bold">Step 1</h2>
      <div className="step">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          // value={fields.name}
          onChange={handleChange}
          name="name"
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lastname"
        >
          Lastname
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastname"
          type="text"
          // value={fields.lastname}
          onChange={handleChange}
          name="lastname"
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          // value={fields.email}
          onChange={handleChange}
          name="email"
        />
      </div>
    </>
  );
}
