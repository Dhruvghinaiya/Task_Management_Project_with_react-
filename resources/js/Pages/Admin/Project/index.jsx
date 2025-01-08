import AdminHeader from '@/Components/AdminHeader';
import ClientHeader from '@/Components/ClientHeader';
import EmployeeHeader from '@/Components/EmployeeHeader';
import React from 'react';

const ProjectList = ({ projects, role,flash }) => {
  console.log(flash);
  
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Project</h1>
          <div className="flex gap-5 ml-auto">
            {role === 'admin' ? (
              <a href={route('admin.project.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Add Project
              </a>
            ) : ''}
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          
            {projects.length === 0 ? (
            <div className="text-center p-6">
              <p className="text-lg font-medium text-gray-500">No projects available</p>
            </div>
          ) : (
            <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border rounded-t-lg">
                    <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
                    <p className="text-gray-600 mt-2">{project.description.slice(0, 50)}...</p>
                    <p className="mt-4 text-sm text-gray-500">Start Date: {new Date(project.start_date).toLocaleDateString()}</p>
                    <p className="mt-2 text-sm text-gray-500">End Date: {new Date(project.end_date).toLocaleDateString()}</p>
                    <div className="mt-4">
                    {role === 'admin' ? (
                      <a
                        href={route('admin.project.show', { id: project.id })}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                      >
                        View Details
                      </a>
                    ) : role === 'client' ? (
                      <a
                        href={route('client.project.show', { id: project.id })}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                      >
                        View Details
                      </a>
                    ) : (
                      <a
                        href={route('employee.project.show', { id: project.id })}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                      >
                        View Details
                      </a>
                    )}

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectList;
