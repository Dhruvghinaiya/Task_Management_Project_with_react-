import AdminHeader from '@/Components/AdminHeader';
import ClientHeader from '@/Components/ClientHeader';
import EmployeeHeader from '@/Components/EmployeeHeader';
import React, { useEffect, useState } from 'react';

const Index = ({ tasks, role, flash, createdTasks }) => {
  console.log(flash);
  
  const [showMessage, setShowMessage] = useState(true); 
  
    useEffect(() => {
      if (flash?.msg || flash?.error) {
        const timeout = setTimeout(() => {
          setShowMessage(false); 
        }, 3000);
  
        return () => clearTimeout(timeout); 
      }
    }, [flash]); 
  
  return (
    <div className="min-h-full">
      {role === 'admin' ? (
        <AdminHeader />
      ) : role === 'employee' ? (
        <EmployeeHeader />
      ) : (
        <ClientHeader />
      )}

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Task</h1>
          <div className="flex gap-5 ml-auto">
            {role === 'admin' ? (
              <a
                href={route('admin.task.create')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Add Task
              </a>
            ) : role === 'employee' ? (
              <a
                href={route('employee.task.create')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Add Task
              </a>
            ) : (
              ''
            )}
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {showMessage && flash && flash.msg && flash.msg.status === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {flash.msg.description}
            </div>
          )}
          {showMessage && flash && flash.error && (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
              {flash.error}
            </div>
          )}
          <div className="container mx-auto p-6">
            {tasks.length === 0 ? (
              <div className="text-center p-6">
                <p className="text-lg font-medium text-gray-500">No tasks available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-semibold text-gray-800">{task.name}</h3>
                    <p className="text-gray-600 mt-2">{task.description.slice(0, 100)}...</p>

                    <div className="mt-4">
                      <span
                        className={`inline-block text-sm font-medium ${
                          task.status == 'pending'
                            ? 'text-yellow-500'
                            : task.status == 'in Progress'
                            ? 'text-blue-500'
                            : 'text-green-500'
                        }`}
                      >
                        Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        {/* {task.status} */}
                      </span>
                    </div>

                    <div className="mt-6 text-right">
                      {role === 'admin' ? (
                        <a
                          href={(route('admin.task.show',{id:task.id}))}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          View Details
                        </a>
                      ) : (role=='employee' ? 
                        <a
                          href={route('employee.task.show',{ id: task.id })}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          View Details
                        </a> : <a
                          href={route('client.task.show',{ id: task.id })}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          View Details
                        </a>
                      ) }
                        
                      
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};


export default Index;
