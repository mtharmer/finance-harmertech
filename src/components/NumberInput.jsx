export default function NumberInput({label, name, value, onChange, ...props}) {
  return (
    <p className="my-2 text-center">
      <label>
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value || ''}
        onChange={(event) => onChange(name, event.target.value)}
        className="mt-1 block rounded-md shadow-sm border-stone-900 bg-stone-50 border-2 text-center disabled:bg-stone-400 w-full"
        {...props}
      />
    </p>
  );
}
