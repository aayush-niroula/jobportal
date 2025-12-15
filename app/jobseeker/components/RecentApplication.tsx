import React from 'react'

const RecentApplication = () => {
  return (
    <div className='w-full bg-white border border-border rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 transition-shadow hover:shadow-md'>
        <div className='flex flex-col gap-3 min-w-0'>
        <h1 className='text-lg sm:text-xl lg:text-2xl font-medium font-playfair truncate'>Recent Applications</h1>
        <p className="text-sm sm:text-base text-muted-foreground">quiggz.in</p>
        <p className='text-sm text-muted-foreground'>Applied on Nov 20,2025</p>
        </div>
        <div className='flex sm:items-center '>
          <span className="bg-red-100 text-red-800 text-xs sm:text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap">
            Under Review
          </span>
        </div>

    </div>
  )
}

export default RecentApplication