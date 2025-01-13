import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Header from "@/Components/Header";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import ReactSelect from "@/Components/ReactSelect";

const Edit = ({ user, errors,roleenum }) => {
    const {
        data,
        setData,
        patch,
        errors: formErrors,
        processing,
    } = useForm({
        name: user.name || "",
        email: user.email || "",
        user_id: user.id,
        created_by: user.created_by,
        role: user.role,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route("admin.user.update", data.user_id), {
            onError: (errorResponse) => {},
        });
    };

    return (
        <div className="min-h-full">
            <Header role="admin" />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Edit User
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="container mx-auto mt-10">
                        <h2 className="text-2xl mb-4">Edit User</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                    required
                                    className="block  text-gray-600 font-medium mb-2"
                                />

                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                                {formErrors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formErrors.name}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    required
                                    className="block  text-gray-600 font-medium mb-2"
                                />

                                <TextInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                {formErrors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formErrors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="role"
                                    value="Role"
                                    required
                                    className="block  text-gray-600 font-medium mb-2"
                                />

                                <div className="mt-2">
                                    
                                    <ReactSelect
                                        name="role"
                                        id="role"
                                        value={data.role}
                                        onChange={(option) =>
                                            setData("role", option.value)
                                        }
                                        options={roleenum}
                                    />
                                    {errors.role && (
                                        <p className="text-red-500 text-sm">
                                            {errors.role}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <input
                                type="hided"
                                name="created_by"
                                hidden
                                value={data.created_by}
                            />

                            <div className="mt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    disabled={processing}
                                >
                                    {processing ? "Saving..." : "Edit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Edit;
