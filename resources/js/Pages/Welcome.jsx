

import React, { useState, } from 'react';

const Welcome = ({ auth }) => {
    console.log(auth);

    // const [authUser, setAuthUser] = useState(auth); // To manage authenticated user state

    
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-gray-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Task Management System</h1>
                    <div>
                        {!auth ? (
                            <a href="/login" className="bg-violet-500 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg">
                                Login
                            </a>
                        ) : (
                            <div>
                                {auth.role === 'admin' && (
                                    <a href={route('dashboard')} className="bg-violet-500 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg">
                                        Dashboard
                                    </a>
                                )}
                                {auth.role === 'employee' && (
                                    <a href={route('employee.dashboard')} className="bg-violet-500 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg">
                                        Dashboard
                                    </a>
                                )}
                                {auth.role === 'client' && (
                                    <a href={'client.dashboard'} className="bg-violet-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg">
                                        Dashboard
                                    </a>
                                )}
                                <a href={route('logout')} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 ml-5 px-4 rounded-lg">
                                    Logout
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">Task Management Project</h1>
                    <p className="text-lg text-gray-600 mt-2">Efficiently manage tasks and projects with our powerful tools.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Overview</h3>
                            <p className="text-gray-600">Get a high-level view of your project's progress, milestones, and status updates.</p>
                        </div>
                        <div className="px-6 pb-6">
                            <a href={route('login')} className="text-indigo-600 hover:text-indigo-800 font-semibold">Learn More</a>
                        </div>
                    </div>
                                 </div>
            </div>

            <footer className="bg-gray-600 text-white p-4 mt-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Task Management System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Welcome;
