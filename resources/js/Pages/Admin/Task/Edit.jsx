import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AdminHeader from '@/Components/AdminHeader';

const Edit = ({ task = {}, projects = [], clients = [], errors = {}, action }) => {
    // Initialize state with default values or existing task data
    const [formData, setFormData] = useState({
        name: task.name || '',
        description: task.description || '',
        status: task.status || 'pending',
        project_id: task.project_id || '',
        assigned_to: task.assigned_to || '',
        start_date: task.start_date ? task.start_date.split('T')[0] : '',
        end_date: task.end_date ? task.end_date.split('T')[0] : '',
        created_by: task.created_by || '',
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission with Inertia.js
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Send the form data via Inertia
    //     Inertia.post(route('admin.task.update'), formData, {
    //         onError: (errorResponse) => {
    //             // Handle any server-side validation errors
    //             console.log(errorResponse);
    //         },
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);  // Add this to check what data is being sent
    
        // Send the form data via Inertia
        Inertia.post(route('admin.task.update',{id:task.id}), formData, {
            onError: (errorResponse) => {
                // Handle any server-side validation errors
                console.log(errorResponse);
            },
        });
    };
    return (
        <div className="min-h-full">
            <AdminHeader/>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Task</h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            {/* Task Name */}
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-xl font-semibold text-gray-700">
                                    Task Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                            </div>

                            {/* Task Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-xl font-semibold text-gray-700">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
                            </div>

                            {/* Task Status */}
                            <div className="mb-6">
                                <label htmlFor="status" className="block text-xl font-semibold text-gray-700">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="status"
                                    id="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-2">{errors.status}</p>}
                            </div>

                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Project ID */}
    {/* <div>
        <label htmlFor="project_id" className="block text-xl font-semibold text-gray-700">
            Project <span className="text-red-500">*</span>
        </label>
        <select
            name="project_id"
            id="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >    <option value="">Select a Client</option>
            {projects.map((project) => (
                <option key={project.id} value={project.id}>
                    {project.name}
                </option>
            ))}
        </select>
        {errors.project_id && <p className="text-red-500 text-sm mt-2">{errors.project_id}</p>}
    </div> */}

    {/* Assigned To */}
    <div>
        <label htmlFor="assigned_to" className="block text-xl font-semibold text-gray-700">
            Assigned To <span className="text-red-500">*</span>
        </label>
        <select
            name="assigned_to"
            id="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            
            {clients.map((client) => (
                <option key={client.id} value={client.id}>
                    {client.name}
                </option>
            ))}
        </select>
        {errors.assigned_to && <p className="text-red-500 text-sm mt-2">{errors.assigned_to}</p>}
    </div>
</div>


                            {/* Start Date */}
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="start_date" className="block text-xl font-semibold text-gray-700">
                                        Start Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        id="start_date"
                                        value={formData.start_date}
                                        onChange={handleChange}
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.start_date && <p className="text-red-500 text-sm mt-2">{errors.start_date}</p>}
                                </div>

                                <div>
                                    <label htmlFor="end_date" className="block text-xl font-semibold text-gray-700">
                                        End Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        id="end_date"
                                        value={formData.end_date}
                                        onChange={handleChange}
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.end_date && <p className="text-red-500 text-sm mt-2">{errors.end_date}</p>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 flex justify-end">
                                <input
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                                >
                                    {/* {task.id ? 'Update Task' : 'Create Task'} */}
                                </input>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Edit;
