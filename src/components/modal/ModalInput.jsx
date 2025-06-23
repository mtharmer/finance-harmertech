export default function ModalInput({id, children, ...props}) {
  return (
    <p className="mx-4">
      <label htmlFor={id} className="block mx-4">{children}</label>
      <input id={id} className="block w-full bg-slate-200 rounded-xl text-center" {...props} />
    </p>
  );
}
