import { Link } from '@inertiajs/react'
import React from 'react'

const CountCard = ({link,color,title,count}) => {
  return (
    <>
              <Link href={link} className="card bg-white p-6 rounded-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
                <p className={`text-3xl font-bold  ${color} `}>{count}</p>
                <p className="text-gray-500">View All Projects</p>
              </Link>
    </>
  )
}

export default CountCard
