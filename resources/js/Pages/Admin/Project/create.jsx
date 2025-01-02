import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader';

const create = ({ clients, employees }) => {
  const { data, setData, post, errors, processing, reset } = useForm({
    name: '',
    description: '',
    client_id: '',
    employee_ids: [],
    start_date: '',
    end_date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.project.store'), data);
  };

  useEffect(() => {
    // Handling errors after the form submission
    if (Object.keys(errors).length > 0) {
      // You can handle form errors here
      console.log(errors);
    }
  }, [errors]);

  return (
    <div className="min-h-full">
      {/* Admin Header */}
          <AdminHeader/>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Project</h1>
          <div className="flex gap-5 ml-auto"></div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl ml-40 mb-4">Add Project</h2>

          {/* Display Success/Error Messages */}
          {/* {flash.success && <x-AlertSuccess message={flash.success} />} */}
          {/* {flash.error && <x-AlertSuccess message={flash.error} />} */}

          {/* Form to add project */}
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Project Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
            </div>

            <div>
              <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">
                Assign Client<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <select
                  name="client_id"
                  id="client_id"
                  value={data.client_id}
                  onChange={(e) => setData('client_id', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="" selected={data.client_id === ''}>
                    No Client
                  </option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {errors.client_id && (
                  <div className="text-red-600 text-sm">{errors.client_id}</div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Assign Employees<span className="text-red-500">*</span>
              </label>

              <div className="mt-1 space-y-2 max-h-16 overflow-y-auto p-1">
                {employees.map((employee) => (
                  <div className="flex items-center space-x-3" key={employee.id}>
                    <input
                      type="checkbox"
                      name="employee_ids[]"
                      value={employee.id}
                      id={`employee_${employee.id}`}
                      checked={data.employee_ids.includes(employee.id)}
                      onChange={(e) => {
                        const updatedEmployeeIds = e.target.checked
                          ? [...data.employee_ids, employee.id]
                          : data.employee_ids.filter((id) => id !== employee.id);
                        setData('employee_ids', updatedEmployeeIds);
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`employee_${employee.id}`}
                      className="text-sm text-gray-700"
                    >
                      {employee.name}
                    </label>
                  </div>
                ))}
              </div>
              {errors.employee_ids && (
                <div className="text-red-600 text-sm">{errors.employee_ids}</div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                  Start Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={data.start_date}
                  onChange={(e) => setData('start_date', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.start_date && (
                  <div className="text-red-600 text-sm">{errors.start_date}</div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                  End Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={data.end_date}
                  onChange={(e) => setData('end_date', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.end_date && (
                  <div className="text-red-600 text-sm">{errors.end_date}</div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                disabled={processing}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default create;
