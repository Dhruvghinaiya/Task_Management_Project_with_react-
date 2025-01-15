import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import EmployeeHeader from '@/Components/EmployeeHeader';
import ReactSelect from '@/Components/ReactSelect';
import Header from '@/Components/Header';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';

const TaskForm = ({ task = {}, projects = [],  role,statuses }) => {
    console.log(task);
    
    const { data, setData,patch,post, processing, errors} = useForm({
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
        const routeName = Object.keys(task).length === 0
            ? (role=='admin' ?  route("admin.task.store") : route("employee.task.store") )  
            : (role=='admin' ?  route("admin.task.update", { id: task.id }) : route('employee.task.update'));  
        const method = Object.keys(task).length === 0 ? post : patch;  
    
        method(routeName, data);
    };
    
const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const selectedProject = projects.find(project => project.id === data.project_id);

        if (selectedProject) {
            setEmployees(
                selectedProject.users.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
        }
    }, [data.project_id, projects]);



    const projectOptions = projects.map((project)=>({
        value:project.id,
        label:project.name
    }));

   
    return (
        <div className="min-h-full">
            <Header role={role} />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Task</h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <InputLabel htmlFor="name" required value='Task Name' className="block text-xl font-semibold text-gray-700"/>
                                
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="mb-6">
                                <InputLabel htmlFor="description" required value='Description' className="block text-xl font-semibold text-gray-700"/>
                                <TextArea
                                    name="description"
                                    id="description"
                                    value={data.description}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                
                                <InputError message={errors.description} />
                            </div>

                            <div className="mb-6">
                                <InputLabel htmlFor="status" required value='Status' className="block text-xl font-semibold text-gray-700"/>
                     
                               
                                 <ReactSelect
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={(option) => setData('status',option?.value)}
                                    options={statuses}
                                    className="w-full"
                                    classNamePrefix="react-select"
                                />
                                
                                <InputError message={errors.status} />
                            </div>

                            <div className='grid grid-cols-2 gap-6'>
                            <div className="mb-6">
                                <InputLabel htmlFor="project_id" required value='project' className="block text-xl font-semibold text-gray-700"/>
                     

                                <ReactSelect
                                 name="project_id"
                                 id="project_id"
                                 value={data.project_id}
                                 onChange={(option)=>setData('project_id',option?.value)}
                                 options={projectOptions}
                                 className='mt-2'
                                 isClearable
                                />
                                
                                <InputError message={errors.project_id} />
                            </div>

                            <div className="mb-6">
                                
                                <InputLabel htmlFor="assigned_to" required value='Assigned To' className="block text-xl font-semibold text-gray-700"/>
                     
                              
                              <ReactSelect
                                name="assigned_to"
                                id="assigned_to"
                                options={employees}
                                value={employees.find(employee => employee.value === data.assigned_to)}  
                                onChange={(option) => setData('assigned_to', option ? option.value : '')}  // 
                                placeholder="Select employee"
                                isClearable
                            />

                                {errors.assigned_to && <p className="text-red-500 text-sm mt-2">{errors.assigned_to}</p>}
                            </div>
                                    </div>
                                
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="start_date" required value='Start Date' className="block text-xl font-semibold text-gray-700"/>
                     
                                    <TextInput
                                        type="date"
                                        name="start_date"
                                        id="start_date"
                                        value={data.start_date}
                                        onChange={handleChange}
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    
                                <InputError message={errors.start_date} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="end_date" required value='End Date' className="block text-xl font-semibold text-gray-700"/>
                     
                                    <TextInput
                                        type="date"
                                        name="end_date"
                                        id="end_date"
                                        value={data.end_date}
                                        onChange={handleChange}
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />  
                                    
                                <InputError message={errors.end_date} />
                                </div>
                            </div>


                            <div className="mt-8 flex justify-end">
                                <PrimaryButton
                                    type="submit"
                                    className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-400 transition duration-300 ease-in-out"
                                    disabled={processing}
                                    children={ Object.keys(task).length==0  ?'Create': 'Update'}
                                />
                                 
                            </div>
                                    
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TaskForm;
