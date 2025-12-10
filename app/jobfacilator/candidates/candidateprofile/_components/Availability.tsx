import React from 'react'

const Availability = () => {
  return (
    <div className='font-playfair bg-white min-w-[460px]  h-auto p-10 flex flex-col gap-4 rounded-2xl border border-black'>
        <h1 className='text-2xl font-bold '>Availabilty & expectations</h1>
        <div>
            <h1>Availabilty</h1>
            <p className='font-bold'>Immediate</p>
        </div>
        <div>
            <h1>Expected Salary</h1>
            <p className='font-bold'>Immediate</p>
        </div>
        <div>
            <h1>Work Preference</h1>
            <p className='font-bold'>Immediate</p>
        </div>
        <div>
            <h1>Job Type</h1>
            <p className='font-bold'>Full time</p>
        </div>
    </div>
  )
}

export default Availability