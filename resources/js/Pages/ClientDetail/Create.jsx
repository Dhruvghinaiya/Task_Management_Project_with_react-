import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryButtonLink from '@/Components/PrimaryButtonLink';
import InputError from '@/Components/InputError';

const Create = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    company_name: '',
    contact_number: '',
    role: 'client',
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
    post(route('admin.client.store'), {
      onSuccess: () => {
        window.location.href = route('admin.client.index');
      },
    });
  };

  return (
    <>
      <Header role='admin' />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 flex">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Client</h1>
            
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            {errors.global && <div className="text-red-500 text-sm">{errors.global}</div>}

            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                  Add New Client
                </h2>
              </div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <InputLabel value='Name' required   htmlFor="name" className="block text-sm font-medium text-gray-900"/>
                      
                    <div className="mt-1">
                      <TextInput
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      <InputError message={errors.name}/>
                    </div>
                  </div>

                  <div>
                   
                    <InputLabel value='Email' required  htmlFor="email"  className="block text-sm font-medium text-gray-900"/>
                    
                    <div className="mt-1">
                      <TextInput
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      <InputError message={errors.email}/>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                     
                      <InputLabel value='Password' required  htmlFor="password"  className="block text-sm font-medium text-gray-900"/>
                    
                    </div>
                    <div className="mt-1">
                      <TextInput
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      <InputError message={errors.password}/>
                    </div>
                  </div>

                  <div>
                    <InputLabel value='Company Name' required  htmlFor="company_name"  className="block text-sm font-medium text-gray-900"/>
                    
                    <div className="mt-1">
                      <TextInput
                        type="text"
                        name="company_name"
                        id="company_name"
                        value={data.company_name}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                       <InputError message={errors.company_name}/>
                    </div>
                  </div>

                  <div>
                    <InputLabel value='Contact Number' required  htmlFor="contact_number"  className="block text-sm font-medium text-gray-900"/>
                    
                    <div className="mt-1">
                      <TextInput
                        type="text"
                        name="contact_number"
                        id="contact_number"
                        value={data.contact_number}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                       <InputError message={errors.contact_number}/>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <PrimaryButton
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      disabled={processing}
                      children={'Add Client'}
                    />
                    <PrimaryButtonLink  
                      href={route('admin.client.index')}
                      className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                      children={'Back'}
                    />
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
 