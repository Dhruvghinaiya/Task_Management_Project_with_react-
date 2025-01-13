
import Header from '@/Components/Header';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import ProjectCard from './Partials/ProjectCard';

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

      <Header role={role}/>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Project</h1>
          <div className="flex gap-5 ml-auto">
            {role === 'admin' ? (
              <Link href={route('admin.project.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Add Project
              </Link>
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
              <ProjectCard project={projects} role={role} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectList;
