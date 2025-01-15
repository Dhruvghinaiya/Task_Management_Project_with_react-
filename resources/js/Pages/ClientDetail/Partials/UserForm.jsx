import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import ReactSelect from "@/Components/ReactSelect";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import PrimaryButtonLink from "@/Components/PrimaryButtonLink";

const UserForm = () => {
    const {user,clients,errors,roleenum} =   usePage().props;
    const client = clients?.length > 0 ? clients[0] : {}; 
    const {
        data,
        setData,
        patch,
        processing,
    } = useForm({
        name: user.name || "",
        email: user.email || "",
        user_id: user.id,
        role: user.role || "",
        created_by: user.created_by,
        company_name: client.company_name || "",
        contact_number: client.contact_number || "",
        client_id: client.id || "", 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const routeToUse = clients?.length > 0 
            ? route("admin.client.update", data.user_id) 
            : route("admin.user.update", data.user_id);

        patch(routeToUse, {
            onError: (errorResponse) => {
                console.log(errorResponse);
            },
        });
    };

    return (
        <div className="min-h-full">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {clients?.length > 0 ? 'Edit Client' : 'Edit User'}
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="container mx-auto mt-10">
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="mb-4">
                                <InputLabel htmlFor="name" value="Name" required className="block text-gray-600 font-medium mb-2" />
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="email" value="Email" required className="block text-gray-600 font-medium mb-2" />
                                <TextInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                <InputError message={errors.email} />
                            </div>
                            {roleenum ? 
                            <div>
                                <InputLabel htmlFor="role" value="Role" required className="block text-gray-600 font-medium mb-2" />
                                <div className="mt-2">
                                    <ReactSelect
                                        name="role"
                                        id="role"
                                        value={data.role}
                                        onChange={(option) => setData("role", option.value)}
                                        options={roleenum}
                                        />
                                    {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                                </div>
                            </div>
                             :''}

                            {/* Render Client Specific Fields if Clients data is available */}
                            {clients?.length > 0 && (
                                <div className="mb-4">
                                    <InputLabel htmlFor="company_name" value="Company Name" required className="block text-gray-600 font-medium mb-2" />
                                    <TextInput
                                        type="text"
                                        name="company_name"
                                        id="company_name"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={data.company_name}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.company_name} />
                                </div>
                            )}

                            {clients?.length > 0 && (
                                <div className="mb-4">
                                    <InputLabel htmlFor="contact_number" value="Contact Number" required className="block text-gray-600 font-medium mb-2" />
                                    <TextInput
                                        type="text"
                                        name="contact_number"
                                        id="contact_number"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={data.contact_number}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.contact_number} />
                                </div>
                            )}

                            <input type="hidden" name="created_by" value={data.created_by} />

                            <div className="mt-4 flex justify-end">
                                <PrimaryButtonLink
                                    href={route(clients?.length > 0 ? "admin.client.index" : "admin.user.index")}
                                    className="px-6 py-3 bg-red-800 mx-3 text-white rounded-lg hover:bg-red-400 transition duration-300 ease-in-out text-center w-full sm:w-auto"
                                    children={"Back to " + (clients?.length > 0 ? "Client" : "User")}
                                />
                                <PrimaryButton
                                    type="submit"
                                    className="inline-block bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    children={clients?.length > 0 ? "Edit Client" : "Edit User"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserForm;
