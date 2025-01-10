
import Header from '@/Components/Header';
import React from 'react';

const Dashboard = ({ projectCount, taskCount, tasks }) => {
  return (
    <div className="min-h-full">
      <Header role='employee'/>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/employee/project"
              className="card bg-white p-6 rounded-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-gray-700">Total Projects</h2>
              <p className="text-3xl font-bold text-green-500">{projectCount}</p>
              <p className="text-gray-500">View All Projects</p>
            </a>

            <a
              href="/employee/task"
              className="card bg-white min-h-[150px] p-6 rounded-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-gray-700">Total Tasks</h2>
              <p className="text-3xl font-bold text-blue-500">{taskCount}</p>
              <p className="text-gray-500">View All Tasks</p>
            </a>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mt-12">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li key={task.id} className="py-4">
                  <div className="flex space-x-3">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Task Updated: {task.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(task.updated_at).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        Status changed to {task.status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
