import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader'; // Assuming you have an AdminHeader component

const CreateClient = () => {
  // Initialize the form with default empty values
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    company_name: '',
    contact_number: '',
    role: 'client',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.client.store'), {
      onSuccess: () => {
        // Redirect or show success message after creating the client
        window.location.href = route('admin.client.index');
      },
    });
  };

  return (
    <>
      <AdminHeader />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 flex">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Client</h1>
            <div className="flex gap-5 ml-auto">
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Add Client
              </a>
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            {/* Error and Success handling */}
            {errors.global && <div className="text-red-500 text-sm">{errors.global}</div>}

            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                  Add New Client
                </h2>
              </div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Password<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                  </div>

                  {/* Company Name Field */}
                  <div>
                    <label
                      htmlFor="company_name"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Company Name<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company_name"
                        id="company_name"
                        value={data.company_name}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      {errors.company_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Number Field */}
                  <div>
                    <label
                      htmlFor="contact_number"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Contact Number<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="contact_number"
                        id="contact_number"
                        value={data.contact_number}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                      {errors.contact_number && (
                        <p className="text-red-500 text-sm mt-1">{errors.contact_number}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      disabled={processing}
                    >
                      Add Client
                    </button>
                    <a
                      href={route('dashboard')}
                      className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
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

export default CreateClient;
 