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
import TaskForm from './Partials/TaskForm';

const Edit = ({ task = {}, projects = [],  errors,role,statuses }) => {
    
    const { data, setData,patch, processing, errors: formErrors,} = useForm({
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
        <TaskForm task={task} projects={projects}  statuses={statuses} role={role} />
       
    );
};

export default Edit;
