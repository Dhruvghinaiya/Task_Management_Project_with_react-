import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Header from "@/Components/Header";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

const Edit = ({ user, clients, errors }) => {
    const client = clients.length > 0 ? clients[0] : {};

    //use patch
    const {
        data,
        setData,
        patch,
        processing,
        errors: formErrors,
    } = useForm({
        name: user.name || "",
        email: user.email || "",
        user_id: user.id,
        role: user?.role,
        created_by: user.created_by,
        company_name: client.company_name || "",
        contact_number: client.contact_number || "",
        client_id: client.id || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route("admin.client.update", data.user_id), {
            onError: (errorResponse) => {
                console.log(errorResponse);
            },
        });
    };

    return (
        <div className="min-h-full">
            <Header role='admin' />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Edit Client
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="container mx-auto mt-10">
                        <h2 className="text-2xl mb-4">Edit Client</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <div className="mb-4">
                                 <InputLabel value='Name' required   htmlFor="name" className="block text-sm font-medium text-gray-900"/>
                                                  
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                                 <InputError message={errors.name}/>
                            </div>

                            <div className="mb-4">
                                 <InputLabel value='Email' required  htmlFor="email"  className="block text-sm font-medium text-gray-900"/>
                                                   
                                <TextInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                  <InputError message={errors.email}/>
                            </div>

                            {clients.length > 0 && (
                                <div key={client.id}>
                                    <input
                                        type="text"
                                        name="client_id"
                                        value={client.id}
                                        hidden
                                    />
                                    <div className="mb-4">
                                        <InputLabel value='Company Name' required  htmlFor="company_name"  className="block text-sm font-medium text-gray-900"/>
                                                           
                                        <TextInput
                                            type="text"
                                            name="company_name"
                                            id="company_name"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={data.company_name}
                                            onChange={handleChange}
                                        />
                                          <InputError message={errors.company_name}/>
                                    </div>

                                    <div className="mb-4">
                                       <InputLabel value='Contact Number' required  htmlFor="contact_number"  className="block text-sm font-medium text-gray-900"/>
                                                          
                                        <TextInput
                                            type="text"
                                            name="contact_number"
                                            id="contact_number"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={data.contact_number}
                                            onChange={handleChange}
                                        />
                                          <InputError message={errors.contact_number}/>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 flex justify-end">
                                <PrimaryButton
                                    type="submit"
                                    className="inline-block bg-blue-700  text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    children={'Edit'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Edit;
