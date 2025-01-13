import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react'
import ReactSelect from '@/Components/ReactSelect';
import Header from '@/Components/Header';
import InputLabel from '@/Components/InputLabel';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const Create = ({roleenum}) => {
  
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
      <Header role='admin' />
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
                    <InputLabel value='Name' required />
                      
                    
                    <div className="mt-2">
                      <TextInput
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                      />
                      <InputError message={errors.name} />
                    </div>
                  </div>
                  <div>
                    <InputLabel value='Email' required />
                    <div className="mt-2">
                      <TextInput
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                      />
                      <InputError message={errors.email} />
                    </div>
                  </div>
                  <div>
                    
                  <InputLabel  value='Password' required />
                    <div className="mt-2">
                      <TextInput
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                      />
                      <InputError message={errors.password} />
                    </div>
                  </div>
                  <div>
                    <InputLabel  value='Role' required />
                    <div className="mt-2">
                     
                      <ReactSelect
                      name="role"
                      id="role"
                      value={data.role}
                      onChange={(option)=> setData('role',option.value) }
                      options={roleenum}
                      />
                      <InputError message={errors.role} />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <PrimaryButton
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500" disabled={processing}
                    >
                      Add user
                    </PrimaryButton >
                    <Link
                      href={route('admin.user.index')}
                      className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                    >
                      Back
                    </Link>
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

export default Create;
