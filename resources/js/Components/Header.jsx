import { Link } from '@inertiajs/react';
import React from 'react'

const Header = ({role,currentPath}) => {
  
  const currentRoute = window.location.pathname;  
 

  return (
    <>  
      <nav className="bg-gray-800 text-white justify-between">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link 
                    href={route(`${role}.dashboard`)} 
                    id="demo" 
                    className={`px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/dashboard' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/dashboard' ? 'page' : undefined}
                  >
                    Dashboard
                  </Link>
                  {role=='admin' ? 
                  <>

                  
                  
                  <Link 
                  href={route(`admin.user.index`)} 
                  className={`px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/user' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/user' ? 'page' : undefined}
                  >
                    User
                  </Link>
                  <Link 
                  href={route('admin.client.index')} 
                  className={`px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/client' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                      aria-current={currentRoute === '/admin/client' ? 'page' : undefined}
                  >
                    Client
                  </Link>
                  </>
                      : ''}

                  <Link 
                    href={route(`${role}.project.index`)} 
                    className={`px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/project' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/client' ? 'page' : undefined}
                  >
                    Project
                  </Link>

                  <Link 
                    href={route(`${role}.task.index`)} 
                    className={`px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/task' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/client' ? 'page' : undefined}
                  >
                    Task
                  </Link>

                  
                  <Link 
                    href={route(`${role}.profile`)} 
                    className={`px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/profile' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/client' ? 'page' : undefined}
                  >
                    Profile
                   </Link>

                  <Link
                    href={route('logout')} 
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button 
                type="button" 
                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" 
                aria-controls="mobile-menu" 
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <svg 
                  className="block size-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="currentColor" 
                  aria-hidden="true" 
                  data-slot="icon"
                > */}
                  {/* <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg 
                  className="hidden size-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="currentColor" 
                  aria-hidden="true" 
                  data-slot="icon"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg> */}
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link 
                    href={route(`${role}.dashboard`)} 
                    preserveScroll
                    className={` block px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/dashboard' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/user' ? 'page' : undefined}
                  >
                    Dashboard
                  </Link>
                    {role=='admin' ? 
            <Link
            href={route('admin.user.index')} 
            preserveScroll
            className={` block px-3 py-2 rounded-md text-sm font-medium 
              ${currentRoute === '/user' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/user' ? 'page' : undefined}
                    >
                    User
                  </Link>
                 : ''}

                  

                  <Link
                    href={route('admin.client.index')} 
                    className={`block px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/client' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/client' ? 'page' : undefined}
                  >
                    Client
                  </Link>

                  <Link 
                    href={route(`${role}.project.index`)} 
                    className={` block px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/project' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/client' ? 'page' : undefined}
                  >
                    Project
                  </Link>
                    
                  <Link 
                    href={route(`${role}.task.index`)} 
                    className={` block px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/task' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/client' ? 'page' : undefined}
                  >
                    Task
                  </Link>
                    
                  <Link 
                    href={route(`${role}.profile`)} 
                    className={` block px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/profile' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/client' ? 'page' : undefined}
                  >
                    Profile
                   </Link>
                   <Link 
                    href={route('logout')} 
                    className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </Link>
        
           
          </div>
       
        </div>
      </nav>
    </>
  );
}

export default Header;
