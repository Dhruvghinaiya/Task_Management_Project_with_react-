import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader';
import EmployeeHeader from '@/Components/EmployeeHeader';
import ClientHeader from '@/Components/ClientHeader';

const Profile = ({ users,flash}) => {
  console.log(flash);

  
    const [showMessage, setShowMessage] = useState(true); 
  
    useEffect(() => {
      if (flash?.msg || flash?.error) {
        const timeout = setTimeout(() => {
          setShowMessage(false); 
        }, 3000);
  
        return () => clearTimeout(timeout); 
      }
    }, [flash]); 
    
  const { data, setData, post, processing, errors,  } = useForm({
    name: users.name,
    role:users.role,
    email: users.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post( users.role==='admin'? route('profile.update')  :(users.role ==='employee'?  route('employee.profile.update') :route('client.profile.update') ) , {
     
    });
  };

  return (
    <div className="min-h-full">
        {users.role === 'admin' ? (
        <AdminHeader />
      ) : users.role === 'employee' ? (
        <EmployeeHeader />
      ) : (
        <ClientHeader />
      )}
       <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showMessage && flash && flash.msg && flash.msg.status === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {flash.msg.description}
            </div>
          )}
          {showMessage && flash && flash.error && (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
              {flash.error}
            </div>
          )}
          <div className="isolate bg-white px-6 sm:py-32 lg:px-8">
            <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
              <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                <div className="col-span-2 text-center">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Image</h2>
                  <div className="mt-4">
                    <img
                      src='https://www.w3schools.com/w3images/avatar2.png'
                      alt="Profile Image"
                      className="w-32 h-32 rounded-full mx-auto"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
                    Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
                    Role
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="role"
                      value={data.role}
                      onChange={(e) => setData('name', e.target.value)}
                      disabled
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                  </div>
                </div>


                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                  </div>
                </div>
              </div>

              <div className="flex gap-7 justify-center">
                <div className="mt-10 w-20">
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    disabled={processing}
                  >
                    Edit
                  </button>
                </div>

                <div className="mt-10 w-20">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    
                    className="block w-full rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Back
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
