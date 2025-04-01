import CountCard from "@/Components/CountCard";
import Header from "@/Components/Header";
import RecentClient from "@/Components/RecentClient";
import RecentEmployee from "@/Components/RecentEmployee";
import RecentProject from "@/Components/RecentProject";
import RecentTask from "@/Components/RecentTask";
import React, { useState } from "react";

const Dashboard = ({
    taskCount,
    clientCount,
    projectCount,
}) => {

    const cardData  = () => [
        {
            link: route("clientDetails.index"),
            color: "text-purple-500",
            count: clientCount,
            title: "Total Clients"
        },
        {
            link: route("admin.project.index"),
            color: "text-green-500",
            count: projectCount,
            title: "Total Projects"
        },
        {
            link: route("admin.task.index"),
            color: "text-blue-500",
            count: taskCount,
            title: "Total Tasks"
        }
    ]

    return (
        <div className="min-h-full">
            <Header role="admin"  />
            
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {cardData().map((props)=>{
                                return (<CountCard link={props.link} color={props.color} count={props.count} title={props.title} />)
                            })}

                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
                            <RecentProject
                            />
                            <RecentTask />

                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5 mb-24">
                            <RecentClient  />
                            <RecentEmployee  />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
