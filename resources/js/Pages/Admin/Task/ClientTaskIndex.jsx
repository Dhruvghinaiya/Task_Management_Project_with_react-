import ClientHeader from '@/Components/ClientHeader';
import React, { useState, useEffect } from 'react';

const ClientTaskIndex = ({ tasks,  }) => {
  const [message, setMessage] = useState(null);
console.log(tasks);

  // Show the message for 5 seconds
//   useEffect(() => {
//     if (successMessage) {
//       setMessage({ status: 'success', description: successMessage });
//     } else if (errorMessage) {
//       setMessage({ status: 'error', description: errorMessage });
//     }

//     if (message) {
//       setTimeout(() => setMessage(null), 5000);
//     }
//   }, [successMessage, errorMessage, message]);

  return (
    <div className="min-h-full">
      {/* Assuming you have a client header component */}
      {/* <ClientHeader /> */}
      
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Task</h1>
          <div className="flex gap-5 ml-auto">
            {/* Add task button logic */}
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4">
            {/* Flash message */}
            {/* {message && (
              <div className={`alert ${message.status === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white p-4 rounded-md`}>
                {message.description}
              </div>
            )} */}
          </div>

          <div className="container mx-auto p-6">
            {/* Task Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.length === 0 ? (
                <div className="text-center p-6">
                  <p className="text-lg font-medium text-gray-500">No tasks available</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="bg-white p-6 rounded-lg border shadow-md">
                    {/* Task Card Content */}
                    <h3 className="text-xl font-semibold text-gray-800">{task.name}</h3>
                    <p className="text-gray-600 mt-2">{task.description.slice(0, 100)}...</p>
                    
                    {/* Task Status */}
                    <div className="mt-4">
                      <span
                        className={`inline-block text-sm font-medium ${
                          task.status === 'pending'
                            ? 'text-yellow-500'
                            : task.status === 'in_progress'
                            ? 'text-blue-500'
                            : 'text-green-500'
                        }`}
                      >
                        {/* {task.status.charAt(0).toUpperCase() + task.status.slice(1)} */}
                      </span>
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-6 text-right">
                      <a
                        // href={`/tasks/${task.id}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientTaskIndex;
