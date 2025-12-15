import React from 'react'

const Availability = () => {
  return (
    <div className='font-playfair bg-white w-full h-auto lg:p-10 sm:p-6 p-4 flex flex-col gap-4 rounded-2xl border border-black'>
        <h1 className='text-2xl font-bold '>Availabilty & expectations</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Availability</p>
          <p className="font-semibold">Immediate</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Expected Salary</p>
          <p className="font-semibold">Negotiable</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Work Preference</p>
          <p className="font-semibold">Remote / Hybrid</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Job Type</p>
          <p className="font-semibold">Full-time</p>
        </div>
      </div>
    </div>
  )
}

export default Availability