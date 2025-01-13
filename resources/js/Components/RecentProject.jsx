import React from 'react'

const RecentProject = ({title,recentProject,}) => {
  return (
    <div>
        <div className="bg-white rounded-lg shadow-md border overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                        {title}
                                    </h2>
                                    <div className="space-y-4">
                                        {recentProject.map((project) => (
                                            <div
                                                key={project.id}
                                                className="bg-gray-50 rounded-lg p-4"
                                            >
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {project.name}
                                                </h3>
                                                <div className="mt-2 flex justify-between text-sm text-gray-600">
                                                    <span>
                                                        Client:{" "}
                                                        {project.client.name}
                                                    </span>
                                                    <span>
                                                        Tasks:{" "}
                                                        {project.tasks.length}
                                                    </span>
                                                </div>
                                                <div className="mt-1 text-sm text-gray-500">
                                                    End Date:{" "}
                                                    {new Date(
                                                        project.end_date
                                                    ).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
    </div>
  )
}

export default RecentProject
