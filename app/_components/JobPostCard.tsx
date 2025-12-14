import { Button } from '@/components/ui/button'
import React from 'react'

const JobPostCard = () => {
  return (
    <div className='lg:min-w-[284px] lg:max-h-[390px] border border-black rounded-2xl bg-white p-4 w-full'>
       <div className='flex items-center gap-4'>
        <img src="Logo.jpg" alt="" className='object-contain max-h-[76px] min-w-[90px] min-w-'/>
        <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-medium'>Linkedin</h1>
            <p className='text-sm font-light '>newyork us</p>
        </div>
        
       </div>
       <div>
        <div className='flex flex-wrap gap-2'>
            <h1>UI/UX designer</h1>
            <p>full time</p>
        </div>
        <div className='flex gap-4'>
            <p>Salary</p>
            <p>4 minutes ago</p>
        </div>
        <div className='bg-[#FAF2F2] h-auto p-4 sm:p-4 text-xs sm:text-sm'>
          <p className=''>We are hiring an energetic UI/UX designer to join our company .You can send your CV by clicking Apply Now</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
        {["Finance", "Design", "Remote"].map((tag, index) => (
          <div
            key={index}
            className="px-3 py-1 border border-black rounded-2xl text-xs sm:text-sm"
          >
            {tag}
          </div>
        ))}
      </div>
       </div>
       <div className='flex justify-between items-center mt-6'>
            <p className='font-bold text-2xl '>$50 <span className='font-light text-sm'>/hour</span></p>
            <Button className='p-6'>Apply Now</Button>
       </div>
    </div>
  )
}

export default JobPostCard