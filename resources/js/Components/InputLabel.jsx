export default function InputLabel({
  value,
  className = '',
  required,
  children,

  ...props
}) {
  return (
    <label
      {...props}

      className={`block font-medium text-sm text-gray-700 ` + className}
    >
      {value ? value : children}
      {required && <span className="ml-1 font-medium text-red-500">*</span>}
    </label>
  );
}
