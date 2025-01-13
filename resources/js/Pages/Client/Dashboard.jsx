import React from "react";
import { usePage } from "@inertiajs/react";
import ClientHeader from "@/Components/ClientHeader";
import CountCard from "@/Components/CountCard";

const Dashboard = () => {
    const { projectCount, taskCount, projects } = usePage().props;

    return (
        <div className="min-h-full">
            <ClientHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Dashboard
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="container mx-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                        <CountCard 
                             link={route("client.project.index")}
                             color="text-purple-500"
                             count={projectCount}
                             title="Total Project"
                        />
                            
                            <CountCard 
                             link={route("client.task.index")}
                             color="text-blue-500"
                             count={taskCount}
                             title="Total Task"
                        />
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Recent Activity
                            </h2>
                            <ul className="divide-y divide-gray-200">
                                {projects.map((project) => (
                                    <li key={project.id} className="py-4">
                                        <div className="flex space-x-3">
                                            <svg
                                                className="h-6 w-6 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-medium text-gray-900">
                                                        Project Updated:{" "}
                                                        {project.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(
                                                            project.updated_at
                                                        ).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                {projects.map((project) =>
                                    project.tasks.slice(-2, 1).map((task) => (
                                        <li key={task.id} className="py-4">
                                            <div className="flex space-x-3">
                                                <svg
                                                    className="h-6 w-6 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                                    ></path>
                                                </svg>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-sm font-medium text-gray-900">
                                                            Task Updated:{" "}
                                                            {task.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(
                                                                task.updated_at
                                                            ).toLocaleTimeString()}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        Status:{" "}
                                                        {task.status.replace(
                                                            "_",
                                                            " "
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;