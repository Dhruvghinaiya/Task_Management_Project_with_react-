
import { Link } from '@inertiajs/react'
import moment from 'moment'
import React from 'react'

const ProjectCard = ({project,role}) => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {project.map((project) => (
                                    <div
                                        key={project.id}
                                        className="bg-white p-6 rounded-lg shadow-md border"
                                    >
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {project.name}
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            {project.description.slice(0, 100)}...
                                        </p>
                                        <p className="mt-4 text-sm text-gray-500">Start Date: {moment(project.start_date).format('DD/MM/YY')}</p>
                                       <p className="mt-2 text-sm text-gray-500">End Date: {moment(project.end_date).format('DD/MM/YY')}</p>
                 
                                        

                                        <div className="mt-2 text-right">
                                            <Link
                                                    href={route(`${role}.project.show`,{ id: project.id }
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

export default ProjectCard
