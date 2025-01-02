import AdminHeader from '@/Components/AdminHeader';
import React from 'react';

const ProjectList = ({ projects }) => {
  return (
    <div className="min-h-full">
      <AdminHeader />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Project</h1>
          <div className="flex gap-5 ml-auto">
            <a href={route('admin.project.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Add Project
            </a>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4">
            {/* Handle the session message */}
            {/* Commented out until it's needed */}
            {/* {message && message.status === 'success' && (
              <div className="alert-container">
                <div className="bg-green-500 text-white p-4 rounded-lg">
                  {message.description}
                </div>
              </div>
            )}
            {message && message.status === 'error' && (
              <div className="alert-container">
                <div className="bg-red-500 text-white p-4 rounded-lg">
                  {message.description}
                </div>
              </div>
            )} */}
          </div>

          {/* Grid to show 3 cards in a row */}
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border rounded-t-lg">
                  <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
                  <p className="text-gray-600 mt-2">{project.description.slice(0, 50)}...</p>
                  <p className="mt-4 text-sm text-gray-500">Start Date: {new Date(project.start_date).toLocaleDateString()}</p>
                  <p className="mt-2 text-sm text-gray-500">End Date: {new Date(project.end_date).toLocaleDateString()}</p>
                  <div className="mt-4">
                    {/* <a href={route('admin.project.show'{project.id})} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                      View Details
                    </a> */}
                    <a
                        href={route('admin.project.show', { id: project.id })}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                        View Details
                        </a>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectList;
