import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AdminHeader from '@/Components/AdminHeader';

const edit = ({ user, clients, errors }) => {
    // Ensure that clients is an array and use the first client if it's an array
    const client = clients.length > 0 ? clients[0] : {}; // Default to an empty object if clients is empty
    
    // Initial form state setup
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        user_id: user.id,
        role:user?.role,
        created_by: user.created_by,
        company_name: client.company_name || '', // Set default to first client or empty
        contact_number: client.contact_number || '', // Set default to first client or empty
        client_id: client.id || '', // Use the first client id
    });

    const [validationErrors, setValidationErrors] = useState(errors || {});

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the form data via Inertia
        Inertia.post(route('admin.client.update', formData.user_id), formData, {
            onError: (errorResponse) => {
                setValidationErrors(errorResponse);
            },
        });
    };

    return (
        <div className="min-h-full">
            <AdminHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Client</h1>
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
                                    value={formData.name} 
                                    onChange={handleChange}
                                />
                                {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.email} 
                                    onChange={handleChange}
                                />
                                {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
                            </div>

                            {/* Client Details (Company Name, Contact Number) */}
                            {clients.length > 0 && (
                                <div key={client.id}>
                                    <input type="text" name="client_id" value={client.id} hidden />
                                    <div className="mb-4">
                                        <label htmlFor="company_name" className="block text-gray-600 font-medium mb-2">Company Name</label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            id="company_name"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                        />
                                        {validationErrors.company_name && <p className="text-red-500 text-sm mt-1">{validationErrors.company_name}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="contact_number" className="block text-gray-600 font-medium mb-2">Contact Number</label>
                                        <input
                                            type="text"
                                            name="contact_number"
                                            id="contact_number"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.contact_number}
                                            onChange={handleChange}
                                        />
                                        {validationErrors.contact_number && <p className="text-red-500 text-sm mt-1">{validationErrors.contact_number}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="mt-4 flex justify-end">
                                <button 
                                    type="submit" 
                                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Edit
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
