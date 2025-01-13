import { Link } from '@inertiajs/react'
import React from 'react'

const TaskCard = ({task,role}) => {
  return (
    <>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {task.map((task) => (
                                    <div
                                        key={task.id}
                                        className="bg-white p-6 rounded-lg shadow-md border"
                                    >
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {task.name}
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            {task.description?.slice(0, 100)}...
                                        </p>

                                        <div className="mt-4">
                                            <span
                                                className={`inline-block text-sm font-medium ${
                                                    task.status == "pending"
                                                        ? "text-yellow-500"
                                                        : task.status ==
                                                          "in Progress"
                                                        ? "text-blue-500"
                                                        : "text-green-500"
                                                }`}
                                            >
                                                Status:{" "}
                                                {task.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    task.status.slice(1)}
                                                {/* {task.status} */}
                                            </span>
                                        </div>

                                        <div className="mt-6 text-right">
                                            <Link
                                                    href={route(`${role}.task.show`,{ id: task.id }
                                                    )}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                >
                                                    View Details
                                                </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
    </>
  )
}

export default TaskCard
