import { Link } from '@inertiajs/react';
import { memo } from 'react';

function PrimaryButtonLink({ className = '', children, ...props }) {
  return (
    <Link
      {...props}
      className={
        'inline-flex items-center px-4 py-2   bg-indigo-500 hover:bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:bg-greenVogue-600 active:bg-greenVogue-900 focus:outline-none focus:ring-2 focus:ring-bg-greenVogue-400 focus:ring-offset-2 transition ease-in-out duration-150 ' +
        className
      }
    >
      {children}
    </Link>
  );
}
export default memo(PrimaryButtonLink);
