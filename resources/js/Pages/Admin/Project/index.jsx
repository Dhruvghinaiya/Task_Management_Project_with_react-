
import Header from '@/Components/Header';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

const ProjectList = ({ projects, role,flash }) => {
  
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
        <Header role='admin' />
      ) : role === 'employee' ? (
        <Header role='employee' />
      ) : (
        <Header role={'client'} />
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
                {showMessage &&
                        flash &&
                        flash.msg &&
                        flash.msg.status === "success" && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                                {flash.msg.description}
                            </div>
                        )}
                    {showMessage && flash && flash.error && (
                        <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
                            {flash.error}
                        </div>
                    )}
            {projects.length === 0 ? (
            <div className="text-center p-6">
              <p className="text-lg font-medium text-gray-500">No projects available</p>
            </div>
          ) : (
            <div className="container mx-auto p-4">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="bg-white p-6 rounded-lg shadow-md border"
                                    >
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {project.name}
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            {project.description.slice(0, 100)}...
                                        </p>
                                        <p className="mt-4 text-sm text-gray-500">Start Date: {new Date(project.start_date).toLocaleDateString()}</p>
                                       <p className="mt-2 text-sm text-gray-500">End Date: {new Date(project.end_date).toLocaleDateString()}</p>
                 
                                        

                                        <div className="mt-2 text-right">
                                            <Link
                                                    href={route(`${role}.project.show`,{ id: project.id }
                                                    )}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                >
                                                    View Details
                                                </Link>
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
