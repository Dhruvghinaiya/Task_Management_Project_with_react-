import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader';
import EmployeeHeader from '@/Components/EmployeeHeader';
import ReactSelect from '@/Components/ReactSelect';

const Edit = ({ task = {}, projects = [], clients = [], errors,role,statuses }) => {
    

    const { data, setData,patch, processing, errors: formErrors,  } = useForm({
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
        console.log(data);  

        patch( role==='admin' ? route('admin.task.update', { id: task.id }) : route('employee.task.update', { id: task.id }) , {
            onError: (errorResponse) => {
                console.log(errorResponse);
            },
        });
    };

    // const handleAssignedToChange = (selectedOptions) => {
    //     const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    //     setData("assigned_to", selectedIds);
    // };
    

const [employees, setEmployees] = useState([]);

useEffect(() => {
    if (data.project_id) {
        fetchAssignedEmployees();
    }
}, [data.project_id]);

const fetchAssignedEmployees = () => {
    const routeUse =  role=='admin'  ?  route('project.employees',data.project_id) :  route('employees.project',data.project_id);
    //  axios.get(route('project.employees',data.project_id))
     axios.get(routeUse)

    // axios.get(route('project.employees', data.project_id))
        .then(response => {
            setEmployees(response.data);
        })
        .catch(error => {
            console.error("Error fetching employees:", error);
        });
};



    const projectOptions = projects.map((project)=>({
        value:project.id,
        label:project.name
    }));

    const employeeOption = clients.map((task)=>({
       value:task.id,
       label:task.name 
    }))
    return (
        <div className="min-h-full">
            {role=='admin' ? <AdminHeader/> : <EmployeeHeader/> }
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Task</h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            {/* <input type="text" name='created_by' value={data.created_by} /> */}
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

                            <div className="mb-6">
                                <label htmlFor="status" className="block text-xl font-semibold text-gray-700">
                                    Status <span className="text-red-500">*</span>
                                </label>
                               
                                 <ReactSelect
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={(option) => setData('status',option.value)}
                                    options={statuses}
                                    className="w-full"
                                    classNamePrefix="react-select"
                                />
                                {formErrors.status && <p className="text-red-500 text-sm mt-2">{formErrors.status}</p>}
                            </div>

                            <div className='grid grid-cols-2 gap-6'>
                            <div className="mb-6">
                                <label htmlFor="project_id" className="block text-xl font-semibold text-gray-700">
                                    Project <span className="text-red-500">*</span>
                                </label>
                                {/* <select
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
                                </select> */}

                                <ReactSelect
                                 name="project_id"
                                 id="project_id"
                                 value={data.project_id}
                                 onChange={(option)=>setData('project_id',option.value)}
                                 options={projectOptions}
                                 className='mt-2'
                                />
                                {formErrors.project_id && <p className="text-red-500 text-sm mt-2">{formErrors.project_id}</p>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="assigned_to" className="block text-xl font-semibold text-gray-700">
                                    Assigned To <span className="text-red-500">*</span>
                                </label>
                              
                              <ReactSelect
                                name="assigned_to"
                                id="assigned_to"
                                options={employees}
                                value={employees.find(employee => employee.value === data.assigned_to)}  
                                onChange={(option) => setData('assigned_to', option ? option.value : '')}  // 
                                placeholder="Select employee"
                                isClearable
                            />

                                {formErrors.assigned_to && <p className="text-red-500 text-sm mt-2">{formErrors.assigned_to}</p>}
                            </div>
                                    </div>
                                
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    {/* <div>
                        <label htmlFor="assigned_to" className="block text-sm font-medium text-gray-700">
                            Assigned To
                        </label>
                        <ReactSelect
                            isMulti
                            name="assigned_to"
                            id="assigned_to"
                            options={employees}
                            value={employees.filter(employee => data.assigned_to.includes(employee.value))} // Adjust value setting
                            onChange={handleAssignedToChange}
                            placeholder="Select employees"
                            isClearable
                        />
                        {errors.assigned_to && <p className="text-red-500 text-sm mt-1">{errors.assigned_to}</p>}
                    </div> */}

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
