import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import ReactSelect from '@/Components/ReactSelect';
import Header from '@/Components/Header';

const Create = ({ clients, employees }) => {
  const { data, setData, post, errors, processing } = useForm({
    name: '',
    description: '',
    client_id: '',
    employee_ids: [],
    start_date: '',
    end_date: '',
  });

  const clientOptions = clients.map(client => ({
    value: client.id,
    label: client.name,
  }));

  const employeeOptions = employees.map(employee => ({
    value: employee.id,
    label: employee.name,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.project.store'), data);
  };

  return (
    <div className="min-h-full">
      <Header role='admin' />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Project</h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl ml-40 mb-4">Add Project</h2>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
              {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description<span className="text-red-500">*</span></label>
              <textarea
                id="description"
                name="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
              {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
            </div>

            <div>
              <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">Assign Client<span className="text-red-500">*</span></label>
              <div className="mt-1">
                <ReactSelect
                  name="client_id"
                  value={data.value}
                  onChange={(option)=> setData('client_id',option.value)}
                  options={clientOptions}
                />
                {errors.client_id && <div className="text-red-600 text-sm">{errors.client_id}</div>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Assign Employees<span className="text-red-500">*</span></label>
              <ReactSelect
                name="employee_ids[]"
                value={employeeOptions.filter(option => data.employee_ids.includes(option.value))}
                onChange={(selectedOptions) => setData('employee_ids', selectedOptions.map(option => option.value))}
                options={employeeOptions}
                isMulti
              />
              {errors.employee_ids && <div className="text-red-600 text-sm">{errors.employee_ids}</div>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date<span className="text-red-500">*</span></label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={data.start_date}
                  onChange={(e) => setData('start_date', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                />
                {errors.start_date && <div className="text-red-600 text-sm">{errors.start_date}</div>}
              </div>

              <div className="space-y-2">
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date<span className="text-red-500">*</span></label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={data.end_date}
                  onChange={(e) => setData('end_date', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                />
                {errors.end_date && <div className="text-red-600 text-sm">{errors.end_date}</div>}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
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

export default Create;
