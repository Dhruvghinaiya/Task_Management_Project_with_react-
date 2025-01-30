import { usePage } from '@inertiajs/react'
import React from 'react'

const RecentTask = () => {
    const{recentTasks} = usePage().props;
  return (
    <>
                                    <div className="bg-white rounded-lg shadow-md border overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                        Recent Tasks
                                    </h2>
                                    <div className="space-y-4">
                                        {recentTasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="bg-gray-50 rounded-lg p-4"
                                            >
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {task.name}
                                                </h3>
                                                <div className="mt-2 flex justify-between text-sm text-gray-600">
                                                    <span>
                                                        Project:{" "}
                                                        {task.project?.name}
                                                    </span>
                                                    {/* <span>Assigned: {task.assigned_user.name}</span> */}
                                                </div>
                                                <div className="mt-1 flex items-center">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            task.status ===
                                                            "completed"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                    >
                                                        {task.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            task.status.slice(
                                                                1
                                                            )}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
    </>
  )
}

export default RecentTask
