import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';

const Show = ({ task,role}) => {
    
  const handleDelete = (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      Inertia.delete(`/admin/task/delete/${task.id}`);  
    }
  };

  return (
    <div className="min-h-full">
      <Header  role={role}/>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Task Details</h1>
          <div className="flex gap-5 ml-auto">
           
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="container mx-auto p-6">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Task Details</h2>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-700">{task.name}</h3>
                <p
                  className={`text-sm mt-2 ${
                    task.status === 'pending'
                      ? 'text-yellow-500'
                      : task.status === 'in Progress'
                      ? 'text-blue-500'
                      : 'text-green-500'
                  }`}
                >
                  Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-700">Description</h4>
                <p className="text-gray-600 mt-2">{task.description ?? 'No description available'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-700">Project</h4>
                  <p className="text-gray-600 mt-2">{task.project?.name ?? 'No project assigned'}</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-700">Assigned To</h4>
                  <p className="text-gray-600 mt-2">
                    {task.assigned_user ? task.assigned_user.name : 'Not assigned'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-700">Start Date</h4>
                  <p className="text-gray-600 mt-2">
                    {task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-700">End Date</h4>
                  <p className="text-gray-600 mt-2">
                    {task.end_date ? new Date(task.end_date).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
              </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-700">Created By</h4>
                <p className="text-gray-600 mt-2">
                  {task.created_by ? task.created_by.name : 'Not Available'}
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-700">Updated By</h4>
                <p className="text-gray-600 mt-2">
                  {task.updated_by ? task.updated_by.name : 'Not Available'}
                </p>
              </div>
            </div>

              <div className="mt-8 flex justify-end items-center space-x-4">

              {role==='admin'  || role=='employee' ? <Link
                  href={route(`${role}.task.edit`,{id:task.id})}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out text-center w-full sm:w-auto"
                >
                  Edit Task
                </Link>  : ''}   
                

                {role==='admin' ? <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out text-center w-full sm:w-auto"
                >
                  Delete Task
                </button>
            : '' }
                
                <Link
                  href={route(`${role}.task.index`)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out text-center w-full sm:w-auto"
                >
                  Back to Task List
                </Link>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Show;
