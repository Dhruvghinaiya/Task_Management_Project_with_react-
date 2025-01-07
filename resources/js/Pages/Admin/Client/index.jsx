import AdminHeader from '@/Components/AdminHeader';
import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

const Index = ({ users, message ,flash}) => {
  console.log(users);
console.log(flash);

  const [successMessage, setSuccessMessage] = useState(null);

  // Check if there's a success message in the Inertia page props
  useEffect(() => {
    if (message) {
      setSuccessMessage(flash.msg.description);
    }
  }, [message]);

  const { delete: deleteRequest } = useForm();

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteRequest(route('admin.client.delete', userId));
    }
  };

  return (
    <>
      <AdminHeader />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Clients</h1>
          <div className="flex gap-5 ml-auto">
            <a
              href={route('admin.client.create')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Add New Client
            </a>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Show Clients</h1>

            {/* Display success message */}
            {successMessage && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}

            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left text-gray-700">Name</th>
                  <th className="py-2 px-4 text-left text-gray-700">Email</th>
                  <th className="py-2 px-4 text-left text-gray-700">Role</th>
                  <th className="py-2 px-4 text-left text-gray-700">Company Name</th>
                  <th className="py-2 px-4 text-left text-gray-700">Contact Number</th>
                  <th className="py-2 px-4 text-center text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="py-2 px-4 text-gray-700">{user.name}</td>
                    <td className="py-2 px-4 text-gray-700">{user.email}</td>
                    <td className="py-2 px-4 text-gray-700">{user.role}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {/* Check if user.clientDetail exists and render company name */}
                      {user.client_detail && user.client_detail.company_name
                        ? user.client_detail.company_name
                        : 'N/A'}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {/* Check if user.clientDetail exists and render contact number */}
                      {user.client_detail && user.client_detail.contact_number
                        ? user.client_detail.contact_number
                        : 'N/A'}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <a
                        href={route('admin.client.edit', user.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
