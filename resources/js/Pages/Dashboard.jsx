import AdminHeader from '@/Components/AdminHeader';
import React from 'react';

// const Dashboard = ({ taskCount, projectCount, clientCount, recentProjects, recentTasks, recentClients, recentEmployees }) => {
const Dashboard = ({ taskCount,clientCount,employeeCount,projectCount,recentProjects,recentTasks,recentClients,recentEmployees }) => {
  console.log(recentClients[1].client_detail.company_name);
  
  return (
    <div className="min-h-full">
      <AdminHeader/>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="container mx-auto p-6">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href={route('admin.client.index')} className="card bg-white p-6 rounded-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <h2 className="text-xl font-semibold text-gray-700">Total Clients</h2>
                <p className="text-3xl font-bold text-purple-500">{clientCount}</p>
                <p className="text-gray-500">View All Clients</p>
              </a>

              <a href={route('admin.project.index')} className="card bg-white p-6 rounded-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <h2 className="text-xl font-semibold text-gray-700">Total Projects</h2>
                <p className="text-3xl font-bold text-green-500">{projectCount}</p>
                <p className="text-gray-500">View All Projects</p>
              </a>

              <a href={route('admin.task.index')} className="card bg-white min-h-[150px] p-6 rounded-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <h2 className="text-xl font-semibold text-gray-700">Total Tasks</h2>
                <p className="text-3xl font-bold text-blue-500">{taskCount}</p>
                <p className="text-gray-500">View All Tasks</p>
              </a>

            </div>

            {/* Recent Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
              <div className="bg-white rounded-lg shadow-md border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Projects</h2>
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                        <div className="mt-2 flex justify-between text-sm text-gray-600">
                          <span>Client: {project.client.name}</span>
                          <span>Tasks: {project.tasks.length}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          End Date: {new Date(project.end_date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Tasks */}
              <div className="bg-white rounded-lg shadow-md border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Tasks</h2>
                  <div className="space-y-4">
                    {recentTasks.map((task) => (
                      <div key={task.id} className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>
                        <div className="mt-2 flex justify-between text-sm text-gray-600">
                          <span>Project: {task.project.name}</span>
                          {/* <span>Assigned: {task.assigned_user.name}</span> */}
                        </div>
                        <div className="mt-1 flex items-center">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Clients and Employees */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5 mb-24">
              <div className="bg-white rounded-lg shadow-md border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Clients</h2>
                  <div className="space-y-4">
                    {recentClients.map((client) => (
                      <div key={client.id} className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{client.name}</h3>
                        <div className="mt-2 text-sm text-gray-600">
                          <p>Email: {client.email}</p>
                          {/* <p>Company: {client.company_name || 'N/A'}  </p> */}
                          {/* <p>Contact: {client.contact_number || 'N/A'}</p> */}
                          <p>Company: {client.client_detail?.company_name || 'N/A'}</p>
                          <p>Contact: {client.client_detail?.contact_number || 'N/A'}</p>
        
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Employees */}
              <div className="bg-white rounded-lg shadow-md border overflow-hidden mb-24">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Employees</h2>
                  <div className="space-y-4">
                    {recentEmployees.map((employee) => (
                      <div key={employee.id} className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{employee.name}</h3>
                        <div className="mt-2 text-sm text-gray-600">
                          <p>Email: {employee.email}</p>
                          <p>Role: {employee.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
