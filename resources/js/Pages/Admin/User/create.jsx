import React, { useState } from 'react';
import AdminHeader from '@/Components/AdminHeader';
import axios from 'axios';
import { useForm } from '@inertiajs/react'




const CreateUser = () => {
    const { data, setData, post, processing, errors } = useForm({
        name:'',
        email: '',
        password: '',
        role:''
      });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('user.store'))
  
  };

  return (
    <>
      <AdminHeader />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add user</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">Add New User</h2>
              </div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit}  method='POST' className="space-y-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                      Password<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                      />
                      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-900">
                      Role<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <select
                        name="role"
                        id="role"
                        value={data.role}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                      >
                        <option value="">Select role</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Employee</option>
                      </select>
                      {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500" disabled={processing}
                    >
                      Add user
                    </button>
                    <a
                      href="#"
                      className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                    >
                      Back
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateUser;
