import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react'; // to handle form data and submission
import { Head } from '@inertiajs/react'; // for setting the page title
import AdminHeader from '@/Components/AdminHeader';
import EmployeeHeader from '@/Components/EmployeeHeader';

const Create = ({ projects, employees, role,flashMessage }) => {
    // Initialize form data using useForm hook from Inertia.js
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        status: '',
        project_id: '',
        assigned_to: '',
        start_date: '',
        end_date: '',
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        role==='admin' ?
        post(route('admin.task.store')) : post(route('employee.task.store')) ; // Assuming you have an Inertia route for this
    };

    // Dummy status enum data (replace with real data from StatusEnum in Laravel)
    const statusOptions = ['Pending', 'In Progress', 'Completed'];

    return (
        <div className="min-h-full">
            {role==='admin'? <AdminHeader/>  : <EmployeeHeader/>}
            <Head title="Task" />

            {/* Header */}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Task</h1>
            </div>

            {/* Main form */}
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-4xl mx-auto p-6 bg-white shadow-md border rounded-lg space-y-6"
                    >
                        {/* Task Name */}
                        <div className="space-y-2">
                            <label htmlFor="task_name" className="block text-sm font-medium text-gray-700">
                                Task Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="task_name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" selected={data.status === ''}>
                                    No Status
                                    </option>
                                {statusOptions.map((status) => (

                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                        </div>

                        {/* Project Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">
                                    Project <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="project_id"
                                    id="project_id"
                                    value={data.project_id}
                                    onChange={(e) => setData('project_id', e.target.value)}
                                    className="w-full m-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                                >
                                    <option value="">Select a project</option>
                                    {projects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.project_id && <div className="text-red-500 text-sm">{errors.project_id}</div>}
                            </div>

                            {/* Assigned To */}
                            <div>
                                <label htmlFor="assigned_to" className="block text-sm font-medium text-gray-700">
                                    Assigned To <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="assigned_to"
                                    id="assigned_to"
                                    value={data.assigned_to}
                                    onChange={(e) => setData('assigned_to', e.target.value)}
                                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                                >
                                    <option value="">Unassigned</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.assigned_to && <div className="text-red-500 text-sm">{errors.assigned_to}</div>}
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    name="start_date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                                    End Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="end_date"
                                    name="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Create;
