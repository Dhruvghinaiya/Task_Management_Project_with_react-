import React, { useEffect, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import Header from "@/Components/Header";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryButtonLink from "@/Components/PrimaryButtonLink";
import FlashMessage from "@/Components/FlashMessage";
import DangerButton from "@/Components/DangerButton";

const Index = ({ users, flash }) => {
    const { delete: deleteRequest } = useForm();

    const handleDelete = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteRequest(route("admin.client.delete", userId));
        }
    };

    return (
        <>
            <Header role="admin" />

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Clients
                    </h1>
                    <div className="flex gap-5 ml-auto">
                        <PrimaryButtonLink
                            href={route("admin.client.create")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            children={"Add New Client"}
                        />
                    </div>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <FlashMessage flash={flash} />
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-bold text-center mb-6">
                            Show Clients
                        </h1>

                        <table className="min-w-full bg-white border   border-gray-300 rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 text-left text-gray-700">
                                        Name
                                    </th>
                                    <th className="py-2 px-4 text-left text-gray-700">
                                        Email
                                    </th>
                                    <th className="py-2 px-4 text-left text-gray-700">
                                        Role
                                    </th>
                                    <th className="py-2 px-4 text-left text-gray-700">
                                        Company Name
                                    </th>
                                    <th className="py-2 px-4 text-left text-gray-700">
                                        Contact Number
                                    </th>
                                    <th className="py-2 px-4 text-center text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="py-2 px-4 text-gray-700">
                                            {user.name}
                                        </td>
                                        <td className="py-2 px-4 text-gray-700">
                                            {user.email}
                                        </td>
                                        <td className="py-2 px-4 text-gray-700">
                                            {user.role}
                                        </td>
                                        <td className="py-2 px-4 text-gray-700">
                                            {user.client_detail &&
                                            user.client_detail.company_name
                                                ? user.client_detail
                                                      .company_name
                                                : "N/A"}
                                        </td>
                                        <td className="py-2 px-4 text-gray-700">
                                            {user.client_detail &&
                                            user.client_detail.contact_number
                                                ? user.client_detail
                                                      .contact_number
                                                : "N/A"}
                                        </td>
                                        {/* <td className="py-2 px-4 text-center">
                                            <PrimaryButtonLink children={'Edit'}
                                                href={route(
                                                    "admin.client.edit",
                                                    user.id
                                                )}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                            />
                                            <PrimaryButton
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                className=" bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2"
                                                children={'Delete'}
                                            />
                                        </td> */}
                                        <td className="py-2 px-4 text-center">
                                            <div className="flex flex-col sm:flex-row sm:space-x-2">
                                                <PrimaryButtonLink
                                                    children={"Edit"}
                                                    href={route(
                                                        "admin.client.edit",
                                                        user.id
                                                    )}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-2 sm:mb-0"
                                                />

                                                <DangerButton
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                    children={"Delete"}
                                                />
                                            </div>
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
