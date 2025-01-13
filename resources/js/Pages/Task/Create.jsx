import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import ReactSelect from "@/Components/ReactSelect";
import Header from "@/Components/Header";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

const Create = ({ projects, role, statuses = "null" }) => {
    const { data, setData, post, errors } = useForm({
        name: "",
        description: "",
        status: "",
        project_id: "",
        assigned_to: "",
        start_date: "",
        end_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        role === "admin"
            ? post(route("admin.task.store"))
            : post(route("employee.task.store"));
    };

    const projectOptions = projects.map((project) => ({
        value: project.id,
        label: project.name,
    }));

    const handleProjectChange = (option) => {
        const projectId = option?.value || "";
        setData("project_id", projectId);
    };

    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const selectedProject = projects.find(
            (project) => project.id === data.project_id
        );

        if (selectedProject) {
            setEmployee(
                selectedProject.users.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
        }
    }, [data.project_id, projects]);

    return (
        <div className="min-h-full">
            <Header role={role} />
            <Head title="Task" />

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Task
                </h1>
            </div>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-4xl mx-auto p-6 bg-white shadow-md border rounded-lg space-y-6"
                    >
                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="task_name"
                                value="Task Name"
                                required
                                className="block text-sm font-medium text-gray-700"
                            />

                            <TextInput
                                type="text"
                                id="task_name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <InputError message={errors.name}/>
                        </div>

                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="description"
                                required
                                value="Description"
                                className="block text-sm font-medium text-gray-700"
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
                            
                            <InputError message={errors.description}/>
                        </div>

                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="status"
                                required
                                value="Status"
                                className="block text-sm font-medium text-gray-700"
                            />

                            <ReactSelect
                                id="status"
                                name="status"
                                value={data.value}
                                onChange={(option) =>
                                    setData("status", option.value)
                                }
                                options={statuses}
                                className="w-full"
                                classNamePrefix="react-select"
                            />
                            <InputError message={errors.status}/>
                        </div>

                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="project_id"
                                required
                                value="Project"
                                className="block text-sm font-medium text-gray-700"
                            />

                            <ReactSelect
                                id="project_id"
                                name="project_id"
                                value={projectOptions.find(
                                    (option) => option.value === data.project_id
                                )}
                                onChange={handleProjectChange}
                                options={projectOptions}
                                className="w-full"
                                classNamePrefix="react-select"
                            />
                            <InputError message={errors.project_id}/>
                        </div>

                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="assigned_to"
                                required
                                value="Assigned To"
                                className="block text-sm font-medium text-gray-700"
                            />

                            <ReactSelect
                                name="assigned_to"
                                id="assigned_to"
                                options={employee}
                                value={employee.find(
                                    (employee) =>
                                        employee.value === data.assigned_to
                                )}
                                onChange={(option) =>
                                    setData(
                                        "assigned_to",
                                        option ? option.value : ""
                                    )
                                }
                                placeholder="Select employee"
                                isClearable
                            />
                            
                            <InputError message={errors.assigned_to}/>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <InputLabel
                                    htmlFor="start_Date"
                                    required
                                    value="Start Date"
                                    className="block text-sm font-medium text-gray-700"
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

                            <InputError message={errors.start_date}/>
                            </div>

                            <div className="space-y-2">
                                <InputLabel
                                    htmlFor="end_date"
                                    required
                                    value=" End Date"
                                    className="block text-sm font-medium text-gray-700"
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
                            <InputError message={errors.end_date}/>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                children={'Submit'}
                            />
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Create;
