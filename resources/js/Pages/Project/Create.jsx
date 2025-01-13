import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import ReactSelect from '@/Components/ReactSelect';
import Header from '@/Components/Header';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

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
              <InputLabel htmlFor="name"  required className="block text-sm font-medium text-gray-700" value='Project Name'/>
              <TextInput
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
              <InputError message={errors.name} />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="description"  required className="block text-sm font-medium text-gray-700" value='Description'/>
              
             
              <TextArea
               id="description"
               name="description"
               value={data.description}
               onChange={(e) => setData('description', e.target.value)}
               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
               />
              
              <InputError message={errors.description} />
            </div>

            <div>
              <InputLabel htmlFor="client_id"  required className="block text-sm font-medium text-gray-700" value='Assign Client'/>
             
              <div className="mt-1">
                <ReactSelect
                  name="client_id"
                  value={data.value}
                  onChange={(option)=> setData('client_id',option.value)}
                  options={clientOptions}
                />
                
              <InputError message={errors.client_id} />
              </div>
            </div>

            <div>
              <InputLabel   required className="block text-sm font-medium text-gray-700" value='Assign Employee'/>
              
              <ReactSelect
                name="employee_ids[]"
                value={employeeOptions.filter(option => data.employee_ids.includes(option.value))}
                onChange={(selectedOptions) => setData('employee_ids', selectedOptions.map(option => option.value))}
                options={employeeOptions}
                isMulti
              />
              
              <InputError message={errors.employee_ids} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <InputLabel htmlFor="start_date"  required className="block text-sm font-medium text-gray-700" value='Start Date'/>
              
                <TextInput
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={data.start_date}
                  onChange={(e) => setData('start_date', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                />
                
              <InputError message={errors.start_date} />
              </div>

              <div className="space-y-2">
                <InputLabel htmlFor="end_date"  required className="block text-sm font-medium text-gray-700" value='End Date'/>
              
                <TextInput
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={data.end_date}
                  onChange={(e) => setData('end_date', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                />
                
              <InputError message={errors.end_date} />
              </div>
            </div>

            <div className="flex justify-end">
              <PrimaryButton
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-800"
                disabled={processing}
                children={'edit'}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Create;
