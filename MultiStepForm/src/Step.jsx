function Step({ fields, state, inputHandle }) {
  return (
    <div>
      {fields.map((field) => (
        <div key={field.name} className="mb-3">
          <label htmlFor={field.name} className="text-gray-700">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={state[field.name]}
              onChange={inputHandle}
              className="block w-full mt-1 p-2 border rounded-md"
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={state[field.name]}
              onChange={inputHandle}
              placeholder={field.placeholder}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          )}
        </div>
      ))}
    </div>
  );
}
export default Step;
