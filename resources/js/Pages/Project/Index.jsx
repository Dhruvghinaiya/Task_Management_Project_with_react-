
import Header from '@/Components/Header';
import ProjectCard from './Partials/ProjectCard';
import PrimaryButtonLink from '@/Components/PrimaryButtonLink';
import FlashMessage from '@/Components/FlashMessage';

const ProjectList = ({ projects, role,flash }) => {
  

  return (
    <div className="min-h-full">

      <Header role={role}/>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Project</h1>
          <div className="flex gap-5 ml-auto">
            {role === 'admin' ? (
              <PrimaryButtonLink href={route('admin.project.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Add Project
              </PrimaryButtonLink>
            ) : ''}
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
               
                    <FlashMessage flash={flash} />
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
