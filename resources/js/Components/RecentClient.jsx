import { usePage } from '@inertiajs/react'
import React from 'react'

const RecentClient = ({recentClient}) => {
    const{recentClients} = usePage().props;
  return (
   <>
    <div className="bg-white rounded-lg shadow-md border overflow-hidden ">
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                        Recent Clients
                                    </h2>
                                    <div className="space-y-4">
                                        {recentClients.map((client) => (
                                            <div
                                                key={client.id}
                                                className="bg-gray-50 rounded-lg p-4"
                                            >
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {client.name}
                                                </h3>
                                                <div className="mt-2 text-sm text-gray-600">
                                                    <p>Email: {client.email}</p>
                                                    {/* <p>Company: {client.company_name || 'N/A'}  </p> */}
                                                    {/* <p>Contact: {client.contact_number || 'N/A'}</p> */}
                                                    <p>
                                                        Company:{" "}
                                                        {client.client_detail
                                                            ?.company_name ||
                                                            "N/A"}
                                                    </p>
                                                    <p>
                                                        Contact:{" "}
                                                        {client.client_detail
                                                            ?.contact_number ||
                                                            "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
   </>
  )
}

export default RecentClient
