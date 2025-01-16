
import React, { useEffect, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import Header from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryButtonLink from '@/Components/PrimaryButtonLink';
import FlashMessage from '@/Components/FlashMessage';
import DangerButton from '@/Components/DangerButton';

const Index = ({ users, flash }) => {
  const { delete: deleteRequest } = useForm();

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteRequest(route('admin.user.destroy', userId));
    }
  };

  return (
    <>
      <Header role='admin' />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">User</h1>
          <div className="flex gap-5 ml-auto">
            <PrimaryButtonLink
              href={route('admin.user.create')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              children={' Add New User'}
            />  
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

      <FlashMessage flash={flash} />

          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Users</h1>

            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left text-gray-700">Name</th>
                  <th className="py-2 px-4 text-left text-gray-700">Email</th>
                  <th className="py-2 px-4 text-left text-gray-700">Role</th>
                  <th className="py-2 px-4 text-center text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.data.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="py-2 px-4 text-gray-700">{user.name}</td>
                    <td className="py-2 px-4 text-gray-700">{user.email}</td>
                    <td className="py-2 px-4 text-gray-700">{user.role}</td>
                    <td className="py-2 px-4 text-center">
                      <PrimaryButtonLink
                        href={route('admin.user.edit', user.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        children={'Edit'}
                      />
                      <DangerButton
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2"
                        children={'Delete'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination data={users} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
