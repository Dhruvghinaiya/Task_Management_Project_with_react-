import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import ReactSelect from "@/Components/ReactSelect";
import Header from "@/Components/Header";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

const Edit = ({ clients, employees, project, projectEmployees }) => {
    const { data, setData, post, patch, errors, processing } = useForm({
        name: project?.name || "",
        description: project?.description || "",
        client_id: project?.client_id || "",
        employee_ids: projectEmployees.map((emp) => emp.id) || [],
        start_date: project.start_date ? project.start_date.split("T")[0] : "",
        end_date: project.end_date ? project.end_date.split("T")[0] : "",
        created_by: project.created_by || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = project
            ? route("admin.project.update", { id: project.id })
            : route("admin.project.store");
        const method = project ? patch : post;
        method(routeName, data);
    };

    const clientOptions = clients.map((client) => ({
        value: client.id,
        label: client.name,
    }));

    const employeeOptions = employees.map((employee) => ({
        value: employee.id,
        label: employee.name,
    }));

    const selectedEmployees = data.employee_ids.map((employeeId) => ({
        value: employeeId,
        label:
            employees.find((employee) => employee.id === employeeId)?.name ||
            "Unknown Employee",
    }));

    return (
        <div className="min-h-full">
            <Header role="admin" />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {project ? "Edit Project" : "Add Project"}
                    </h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h2 className="text-2xl ml-40 mb-4">
                        {project ? "Edit Project" : "Add Project"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
                    >
                        <input
                            type="text"
                            value={data.created_by}
                            name="created_by"
                            hidden
                        />
                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="name"
                                required
                                className="block text-sm font-medium text-gray-700"
                                value="Project Name"
                            />

                            <TextInput
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.name && (
                                <div className="text-red-600 text-sm">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="description"
                                required
                                className="block text-sm font-medium text-gray-700"
                                value="Description"
                            />

                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.description && (
                                <div className="text-red-600 text-sm">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="client_id"
                                value="Assign Client"
                                required
                                className="block text-sm font-medium text-gray-700"
                            />

                            <div className="mt-1">
                                <ReactSelect
                                    name="client_id"
                                    id="client_id"
                                    value={
                                        clientOptions.find(
                                            (client) =>
                                                client.value === data.client_id
                                        ) || null
                                    }
                                    onChange={(e) =>
                                        setData("client_id", e.value)
                                    }
                                    options={clientOptions}
                                />
                                {errors.client_id && (
                                    <div className="text-red-600 text-sm">
                                        {errors.client_id}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <InputLabel
                                required
                                className="block text-sm font-medium text-gray-700"
                                value="Assign Employee"
                            />

                            <div className="mt-1">
                                <ReactSelect
                                    isMulti
                                    name="employee_ids"
                                    id="employee_ids"
                                    value={data.employee_ids.map((id) => {
                                        const employee = employees.find(
                                            (emp) => emp.id === id
                                        );
                                        return employee
                                            ? {
                                                  value: employee.id,
                                                  label: employee.name,
                                              }
                                            : null;
                                    })}
                                    onChange={(selectedOptions) =>
                                        setData(
                                            "employee_ids",
                                            selectedOptions
                                                ? selectedOptions.map(
                                                      (option) => option.value
                                                  )
                                                : []
                                        )
                                    }
                                    options={employeeOptions}
                                />
                                {errors.employee_ids && (
                                    <div className="text-red-600 text-sm">
                                        {errors.employee_ids}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <InputLabel
                                    htmlFor="start_date"
                                    required
                                    className="block text-sm font-medium text-gray-700"
                                    value="Start Date"
                                />

                                <TextInput
                                    type="date"
                                    id="start_date"
                                    name="start_date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData("start_date", e.target.value)
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.start_date && (
                                    <div className="text-red-600 text-sm">
                                        {errors.start_date}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <InputLabel
                                    htmlFor="end_date"
                                    required
                                    className="block text-sm font-medium text-gray-700"
                                    value="End Date"
                                />

                                <TextInput
                                    type="date"
                                    id="end_date"
                                    name="end_date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData("end_date", e.target.value)
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.end_date && (
                                    <div className="text-red-600 text-sm">
                                        {errors.end_date}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                disabled={processing}
                            >
                                {project ? "Update" : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Edit;
