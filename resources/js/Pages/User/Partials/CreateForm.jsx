import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import ReactSelect from '@/Components/ReactSelect';
import Header from '@/Components/Header';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const CreateForm = ({ roleenum }) => {
    const{type} = usePage().props;
    
    
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    role: type === 'user' ? '' : 'client', 
    company_name: type === 'client' ? '' : undefined,
    contact_number: type === 'client' ? '' : undefined,
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
    post(route(type === 'user' ? 'user.store' : 'clientDetails.store'), {
      onSuccess: () => {
        window.location.href = route(type === 'user' ? 'user.index' : 'clientDetails.index');
      },
    });
  };

  return (
    <>
      <Header role="admin" />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {type === 'user' ? 'Add User' : 'Add Client'}
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                  {type === 'user' ? 'Add New User' : 'Add New Client'}
                </h2>
              </div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div>
                    <InputLabel value="Name" required />
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
                    <InputLabel value="Email" required />
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
                      <InputLabel value="Password" required />
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


                  {type === 'client' && (
                    <>
                      <div>
                        <InputLabel value="Company Name" required />
                        <div className="mt-2">
                          <TextInput
                            type="text"
                            name="company_name"
                            id="company_name"
                            value={data.company_name}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                          />
                          <InputError message={errors.company_name} />
                        </div>
                      </div>

                      <div>
                        <InputLabel value="Contact Number" required />
                        <div className="mt-2">
                          <TextInput
                            type="text"
                            name="contact_number"
                            id="contact_number"
                            value={data.contact_number}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                          />
                          <InputError message={errors.contact_number} />
                        </div>
                      </div>
                    </>
                  )}

                  {type=== 'user' && (
                    <div>
                      <InputLabel value="Role" required />
                      <div className="mt-2">
                        <ReactSelect
                          name="role"
                          id="role"
                          value={data.role}
                          onChange={(option) => setData('role', option.value)}
                        
                          options={roleenum.filter(option => option.value !== 'client')} 
                          
                        />
                        <InputError message={errors.role} />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-8">
                    <PrimaryButton
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                      disabled={processing}
                    >
                      {type === 'user' ? 'Add User' : 'Add Client'}
                    </PrimaryButton>
                    <Link
                      href={route(type === 'user' ? 'user.index' : 'clientDetails.index')}
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

export default CreateForm;
