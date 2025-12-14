import React from 'react'

const RecentApplication = () => {
  return (
    <div className='max-w-[853px] h-auto bg-white border border-black flex justify-between items-center p-6 font-playfair'>
        <div className='flex flex-col gap-3'>
        <h1 className='lg:text-2xl font-bold '>Recent Applications</h1>
        <p>quiggz.in</p>
        <p>Applied on Nov 20,2025</p>
        </div>
        <div className='bg-red-400 lg:p-2 p-1 rounded-sm mt-8'>
            Under Review
        </div>

    </div>
  )
}

export default RecentApplication