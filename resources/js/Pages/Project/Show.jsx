import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import TaskCard from "../Task/Partials/TaskCard";
import moment from "moment";
import PrimaryButtonLink from "@/Components/PrimaryButtonLink";
import FlashMessage from "@/Components/FlashMessage";
import DangerButton from "@/Components/DangerButton";

const Show = ({ project, client, role, flash }) => {
    const handleDelete = (e) => {
        e.preventDefault();

        if (window.confirm("Are you sure you want to delete this project?")) {
            Inertia.delete(route("admin.project.delete", { id: project.id }), {
                onSuccess: () => {
                    Inertia.visit(route("admin.project.index"));
                },
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="min-h-full">
            <Header role={role} />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Project Details
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <FlashMessage flash={flash} />
                    <div className="bg-white p-8 rounded-lg shadow-md border">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {project.name}
                        </h2>
                        <p className="text-gray-600 mt-4 text-lg">
                            <strong>Description:</strong> {project.description}
                        </p>

                        <p className="mt-4 text-sm text-gray-500">
                            <strong>Start Date:</strong>{" "}
                            {moment(project.start_date).format("DD/MM/YY")}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            <strong>End Date:</strong>{" "}
                            {moment(project.end_date).format("DD/MM/YY")}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            <strong>Client Name:</strong> {client.name}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            <strong>Created By:</strong>{" "}
                            {project.created_by?.name}
                        </p>

                        <p className="mt-2 text-sm text-gray-500 mb-5">
                            <strong>Updated By:</strong>{" "}
                            {project.updated_by?.name || "No Updated"}
                        </p>

                        <div className="flex space-x-4">
                            {role == "admin" ? (
                                <PrimaryButtonLink
                                    href={route("admin.project.edit", {
                                        id: project.id,
                                    })}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 w-full sm:w-auto"
                                    children={"Edit"}
                                />
                            ) : (
                                ""
                            )}

                            {role == "admin" ? (
                                <DangerButton
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 w-full sm:w-auto"
                                    children={"delete"}
                                />
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mt-6">
                            <PrimaryButtonLink
                                href={route(`${role}.project.index`)}
                                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                                children={"   Back to Projects"}
                            />
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Tasks
                        </h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            {project.tasks.length > 0 ? (
                                <TaskCard
                                    task={project.tasks}
                                    disable={true}
                                    role={role}
                                />
                            ) : (
                                <p className="text-gray-600">
                                    No tasks assigned to this project yet.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Project Employees
                        </h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            {project.users.length > 0 ? (
                                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                                    {project.users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="bg-white p-3 rounded-lg shadow text-center"
                                        >
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <span className="text-2xl font-semibold text-blue-600">
                                                    {user.name
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="font-medium text-gray-900">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {user.role
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    user.role.slice(1)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">
                                    No employees assigned to this project yet.
                                </p>
                            )}
                        </div>
                    </div>

                    {project.client && project.client.clientDetail && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Client Details
                            </h2>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p>
                                    <span className="font-medium text-gray-600">
                                        Company Name:
                                    </span>{" "}
                                    {project.client.clientDetail.company_name ??
                                        "N/A"}
                                </p>
                                <p className="mt-2">
                                    <span className="font-medium text-gray-600">
                                        Contact Number:
                                    </span>{" "}
                                    {project.client.clientDetail
                                        .contact_number ?? "N/A"}
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
