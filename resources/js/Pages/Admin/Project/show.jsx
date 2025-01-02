import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import AdminHeader from '@/Components/AdminHeader';

const Show = ({ project, client }) => {
    console.log(project);
    
  return (
    <div className="min-h-full">
      {/* Admin Header */}
      {/* <x-admin-header /> */}
      <AdminHeader/>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Project Details</h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold text-gray-800">{project.name}</h2>

            <p className="text-gray-600 mt-4 text-lg">
              <strong>Description:</strong> {project.description}
            </p>

            <p className="text-gray-600 mt-4 text-lg">
              {/* <strong>Created By:</strong> {project.creator.name} */}
            </p>

            <p className="text-gray-600 mt-4 text-lg">
              {/* <strong>Updated By:</strong> {project.updater.name} */}
            </p>

            <p className="mt-4 text-sm text-gray-500 ">
              <strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              <strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}
            </p>
            <p className="mt-4 text-sm text-gray-500 ">
              <strong>Client Name:</strong> {client.name}
            </p>

            <div className="mt-6 flex space-x-4">
              {/* Edit Button */}
              <a
                href={`/admin/project/edit/${project.id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </a>

              {/* Delete Button (with confirmation) */}
              <form
                action={`/admin/project/delete/${project.id}`}
                method="POST"
                onSubmit={() => confirm('Are you sure you want to delete this project?')}
              >
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </form>
            </div>

            {/* Back Button */}
            <div className="mt-6">
              <a
                href="/admin/project/index"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Back to Projects
              </a>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tasks</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              {/* {project.tasks.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {project.tasks.map((task) => (
                    <div className="bg-white p-4 rounded-lg shadow" key={task.id}>
                      <h3 className="font-semibold text-lg text-gray-900">{task.name}</h3>
                      <p className="text-gray-600 mt-1">{task.description}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            task.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : task.status === 'in_progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {task.assignedUser ? task.assignedUser.name : 'Unassigned'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Created: {new Date(task.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No tasks assigned to this project yet.</p>
              )} */}
            </div>
          </div>

          {/* Project Employees Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Employees</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              {/* {project.users.length > 0 ? (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {project.users.map((user) => (
                    <div className="bg-white p-3 rounded-lg shadow text-center" key={user.id}>
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-semibold text-blue-600">
                          {user.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No employees assigned to this project yet.</p>
              )} */}
            </div>
          </div>

          {/* Client Details Section */}
          {project.client && project.client.clientDetail && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Client Details</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>
                  <span className="font-medium text-gray-600">Company Name:</span> {project.client.clientDetail.company_name}
                </p>
                <p className="mt-2">
                  <span className="font-medium text-gray-600">Contact Number:</span> {project.client.clientDetail.contact_number}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Show;
