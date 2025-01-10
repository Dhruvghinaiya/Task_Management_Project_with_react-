import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import ReactSelect from '@/Components/ReactSelect';
import Header from '@/Components/Header';

const Create = ({ projects, role, statuses = 'null' }) => {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        status: '',
        project_id: '',
        assigned_to: '',
        start_date: '',
        end_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        role === 'admin'
            ? post(route('admin.task.store'))
            : post(route('employee.task.store'));
    };

    const projectOptions = projects.map((project) => ({
        value: project.id,
        label: project.name,
    }));

    const handleProjectChange = (option) => {
        const projectId = option?.value || '';
        setData('project_id', projectId);
    };

    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const selectedProject = projects.find(project => project.id === data.project_id);

        if (selectedProject) {
            setEmployee(
                selectedProject.users.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
        }
    }, [data.project_id, projects]);

    return (
        <div className="min-h-full">
            <Header  role={role}/>
            <Head title="Task" />

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Task</h1>
            </div>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-4xl mx-auto p-6 bg-white shadow-md border rounded-lg space-y-6"
                    >
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

                        <div className="space-y-2">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <ReactSelect
                                id="status"
                                name="status"
                                value={data.value}
                                onChange={(option) => setData('status', option.value)}
                                options={statuses}
                                className="w-full"
                                classNamePrefix="react-select"
                            />
                            {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">
                                Project <span className="text-red-500">*</span>
                            </label>
                            <ReactSelect
                                id="project_id"
                                name="project_id"
                                value={projectOptions.find(option => option.value === data.project_id)}
                                onChange={handleProjectChange}
                                options={projectOptions}
                                className="w-full"
                                classNamePrefix="react-select"
                            />
                            {errors.project_id && <div className="text-red-500 text-sm">{errors.project_id}</div>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="assigned_to" className="block text-sm font-medium text-gray-700">
                                Assigned To <span className="text-red-500">*</span>
                            </label>

                            <ReactSelect
                                name="assigned_to"
                                id="assigned_to"
                                options={employee}
                                value={employee.find(employee => employee.value === data.assigned_to)}  
                                onChange={(option) => setData('assigned_to', option ? option.value : '')}
                                placeholder="Select employee"
                                isClearable
                            />
                            {errors.assigned_to && <div className="text-red-500 text-sm">{errors.assigned_to}</div>}
                        </div>

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
