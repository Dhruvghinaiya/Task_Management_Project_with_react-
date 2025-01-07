import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader';

const edit = ({ user, errors }) => {
    // Initialize the form with user data and validation errors
    const { data, setData, post, errors: formErrors, processing } = useForm({
        name: user.name || '',
        email: user.email || '',
        user_id: user.id,
        created_by: user.created_by,
        role: user.role,
    });

    // Handle input change using setData from useForm
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value); // use setData to update form values
    };

    // Handle form submission using post method from useForm
    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the form via Inertia post request
        post(route('admin.user.update', data.user_id), {
            onError: (errorResponse) => {
                // Inertia automatically handles error responses and stores them in `formErrors`
            },
        });
    };

    return (
        <div className="min-h-full">
            <AdminHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit User</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="container mx-auto mt-10">
                        <h2 className="text-2xl mb-4">Edit Client</h2>
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                            {/* Client Name */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 font-medium mb-2">Client Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.name} 
                                    onChange={handleChange}
                                />
                                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.email} 
                                    onChange={handleChange}
                                />
                                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
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
                        <option value="employee">Employee</option>
                      </select>
                      {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                    </div>
                  </div>
                            <input type="text" name="created_by" hidden value={data.created_by} />
                            {/* <input type="text" name="role" hidden value={data.role} /> */}

                            {/* Submit Button */}
                            <div className="mt-4 flex justify-end">
                                <button 
                                    type="submit" 
                                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    disabled={processing} // Disable button while processing
                                >
                                    {processing ? 'Saving...' : 'Edit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default edit;
