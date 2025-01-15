import { usePage } from '@inertiajs/react'
import React from 'react'

const RecentEmployee = ({recentEmployee}) => {
    const{recentEmployees} =  usePage().props;
  return (
    <>
    <div className="bg-white rounded-lg shadow-md border overflow-hidden mb-24">
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                        Recent Employees
                                    </h2>
                                    <div className="space-y-4">
                                        {recentEmployees.map((employee) => (
                                            <div
                                                key={employee.id}
                                                className="bg-gray-50 rounded-lg p-4"
                                            >
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {employee.name}
                                                </h3>
                                                <div className="mt-2 text-sm text-gray-600">
                                                    <p>
                                                        Email: {employee.email}
                                                    </p>
                                                    <p>Role: {employee.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
    </>
  )
}

export default RecentEmployee
