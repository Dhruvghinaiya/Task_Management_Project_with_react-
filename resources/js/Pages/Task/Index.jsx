
import Header from "@/Components/Header";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import TaskCard from "./Partials/TaskCard";
import PrimaryButtonLink from "@/Components/PrimaryButtonLink";
import FlashMessage from "@/Components/FlashMessage";

const Index = ({ tasks, role, flash, }) => {

    return (
        <div className="min-h-full">
             <Header role={role}/>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Task
                    </h1>
                    <div className="flex gap-5 ml-auto">
                        {role === "admin"  || role==='employee' ? (
                            <PrimaryButtonLink
                                href={route(`${role}.task.create`)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                children={'Add Task'}
                            />
                        ) : '' }
                        
                    </div>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                  
                    <FlashMessage flash={flash}/>

                    <div className="container mx-auto p-6">
                        {tasks.length === 0 ? (
                            <div className="text-center p-6">
                                <p className="text-lg font-medium text-gray-500">
                                    No tasks available
                                </p>
                            </div>
                        ) : (
                            <TaskCard task={tasks} disable={false} role={role} />
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Index;
