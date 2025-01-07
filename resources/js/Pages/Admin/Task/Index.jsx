import AdminHeader from '@/Components/AdminHeader';
import ClientHeader from '@/Components/ClientHeader';
import EmployeeHeader from '@/Components/EmployeeHeader';
import React, { useEffect, useState } from 'react';

const Index = ({ tasks, role, flashMessage, createdTasks }) => {
  console.log(tasks);
  
  // Flash message state to handle dynamic messages
  const [message, setMessage] = useState(flashMessage);

  // Optional: You can show flash message for a short time and auto-hide it
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null); // Hide message after 5 seconds (for example)
      }, 5000);
    }
  }, [message]);

  return (
    <div className="min-h-full">
      {/* Assuming <AdminHeader /> is a custom React component */}
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
          <div className="mb-4">
            {/* Flash Message */}
            {message && (
              <div id="alert-message" className="alert-container">
                {message.status === 'success' ? (
                  <AlertSuccess message={message.description} />
                ) : (
                  <AlertError message={message.description} />
                )}
              </div>
            )}
          </div>

          <div className="container mx-auto p-6">
            {/* Check if there are no tasks */}
            {tasks.length === 0 ? (
              <div className="text-center p-6">
                <p className="text-lg font-medium text-gray-500">No tasks available</p>
              </div>
            ) : (
              // Task Cards Grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white p-6 rounded-lg shadow-md border">
                    {/* Task Card Content */}
                    <h3 className="text-xl font-semibold text-gray-800">{task.name}</h3>
                    <p className="text-gray-600 mt-2">{task.description.slice(0, 100)}...</p>

                    {/* Task Status */}
                    <div className="mt-4">
                      <span
                        className={`inline-block text-sm font-medium ${
                          task.status === 'Pending'
                            ? 'text-yellow-500'
                            : task.status === 'In Progress'
                            ? 'text-blue-500'
                            : 'text-green-500'
                        }`}
                      >
                        {task.status.replace('_', ' ')}
                        {/* {task.status} */}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 text-right">
                      {role === 'admin' ? (
                        <a
                          href={(route(`${role}.task.show`))}
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

// Example success and error alert components
const AlertSuccess = ({ message }) => (
  <div className="bg-green-500 text-white p-4 rounded-md">{message}</div>
);

const AlertError = ({ message }) => (
  <div className="bg-red-500 text-white p-4 rounded-md">{message}</div>
);

export default Index;
