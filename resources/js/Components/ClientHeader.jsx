import React from 'react'

const ClientHeader = () => {
  // Assuming `route` is a helper function to get the current route
  // You can modify it based on your actual routing setup, like `window.location.pathname` in a React app.
  const currentRoute = window.location.pathname;  // or use useLocation from React Router if you're using it

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
                  <a 
                    href={route('client.dashboard')} 
                    id="demo" 
                    className={`px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/dashboard' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/dashboard' ? 'page' : undefined}
                  >
                    Dashboard
                  </a>
                  <a 
                    href={route('admin.user.index')} 
                    className={`px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/user' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/user' ? 'page' : undefined}
                  >
                    User
                  </a>
                  <a 
                    href={route('admin.client.index')} 
                    className={`px-3 py-2 rounded-md text-sm font-medium 
                      ${currentRoute === '/client' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    aria-current={currentRoute === '/admin/client' ? 'page' : undefined}
                  >
                    Client
                  </a>
                  {/* Other links */}
                  <a 
                    href={route('logout')} 
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </a>
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
                <svg 
                  className="block size-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="currentColor" 
                  aria-hidden="true" 
                  data-slot="icon"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a 
              href="#" 
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" 
              aria-current="page"
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Tasks
            </a>
            <a 
              href="#" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Projects
            </a>
            <a 
              href="#" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Calendar
            </a>
            <a 
              href="#" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Reports
            </a>
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                <img 
                  className="size-10 rounded-full" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base/5 font-medium text-white">Tom Cook</div>
                <div className="text-sm font-medium text-gray-400">tom@example.com</div>
              </div>
              <button 
                type="button" 
                className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg 
                  className="size-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="currentColor" 
                  aria-hidden="true" 
                  data-slot="icon"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <a 
                href="#" 
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Your Profile
              </a>
              <a 
                href="#" 
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Settings
              </a>
              <a 
                href="#" 
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default ClientHeader;
