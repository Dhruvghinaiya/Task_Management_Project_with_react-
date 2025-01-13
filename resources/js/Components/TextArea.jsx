import React from 'react';

function TextArea({ rows, className, ...props }) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={`
        block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-greenVogue-100 ${className}
      `}
    />
  );
}

export default TextArea;
