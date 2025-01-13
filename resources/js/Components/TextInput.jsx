import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      className={
        'block w-full border-gray-300 focus:border-greenVogue-100 focus:ring-greenVogue-100 rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200 ' +
        className
      }
      ref={input}
    />
  );
});
