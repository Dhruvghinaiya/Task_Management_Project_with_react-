import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader';

const Edit = ({ task = {}, projects = [], clients = [], errors,role }) => {
    console.log(task);

    const { data, setData, post, processing, errors: formErrors, reset } = useForm({
        name: task.name || '',
        description: task.description || '',
        status: task.status || '',
        project_id: task.project_id || '',
        assigned_to: task.assigned_to || '',
        start_date: task.start_date ? task.start_date.split('T')[0] : '',
        end_date: task.end_date ? task.end_date.split('T')[0] : '',
        created_by: task.created_by || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);  // Log form data for debugging

        // Submit the form data using Inertia
        post( role==='admin' ? route('admin.task.update', { id: task.id }) : route('employee.task.update', { id: task.id }) , {
            onError: (errorResponse) => {
                // Handle server-side validation errors
                console.log(errorResponse);
            },
        });
    };

    return (
        <div className="min-h-full">
            <AdminHeader />
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
                                    value={data.name}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {formErrors.name && <p className="text-red-500 text-sm mt-2">{formErrors.name}</p>}
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
                                    value={data.description}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                                {formErrors.description && <p className="text-red-500 text-sm mt-2">{formErrors.description}</p>}
                            </div>

                            {/* Task Status */}
                            <div className="mb-6">
                                <label htmlFor="status" className="block text-xl font-semibold text-gray-700">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="status"
                                    id="status"
                                    value={data.status}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                {formErrors.status && <p className="text-red-500 text-sm mt-2">{formErrors.status}</p>}
                            </div>

                            <div className='grid grid-cols-2 gap-6'>
                            {/* Project ID */}
                            <div className="mb-6">
                                <label htmlFor="project_id" className="block text-xl font-semibold text-gray-700">
                                    Project <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="project_id"
                                    id="project_id"
                                    value={data.project_id}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a Project</option>
                                    {projects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.project_id && <p className="text-red-500 text-sm mt-2">{formErrors.project_id}</p>}
                            </div>

                            {/* Assigned To */}
                            <div className="mb-6">
                                <label htmlFor="assigned_to" className="block text-xl font-semibold text-gray-700">
                                    Assigned To <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="assigned_to"
                                    id="assigned_to"
                                    value={data.assigned_to}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.name}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.assigned_to && <p className="text-red-500 text-sm mt-2">{formErrors.assigned_to}</p>}
                            </div>
                                    </div>
                                
                           {/* Start and End Date */}
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Start Date */}
                                <div>
                                    <label htmlFor="start_date" className="block text-xl font-semibold text-gray-700">
                                        Start Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        id="start_date"
                                        value={data.start_date}
                                        onChange={handleChange}
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formErrors.start_date && <p className="text-red-500 text-sm mt-2">{formErrors.start_date}</p>}
                                </div>

                                {/* End Date */}
                                <div>
                                    <label htmlFor="end_date" className="block text-xl font-semibold text-gray-700">
                                        End Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        id="end_date"
                                        value={data.end_date}
                                        onChange={handleChange}
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formErrors.end_date && <p className="text-red-500 text-sm mt-2">{formErrors.end_date}</p>}
                                </div>
                            </div>


                            {/* Submit Button */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update Task'}
                                </button>
                            </div>
                                    
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Edit;
