"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
type JobPostCard={
  title:string,
  company:string,
  salary:string,
  type:string,
  location:string
  posted:string
}


const JobPostCard = ({title,company,location,salary,type,posted}:JobPostCard) => {
  const router = useRouter()
  return (
    <div className='border border-gray-200 rounded-2xl bg-gradient-to-br from-white to-slate-50 p-5 w-full flex flex-col h-full shadow-sm hover:shadow-md transition-shadow'>
       <div className='flex items-center gap-4'>
        <img src="Logo.jpg" alt="" className='object-contain h-16 w-20 rounded-lg'/>
        <div className='flex flex-col gap-2'>
            <h1 className='text-lg lg:text-xl font-medium'>{company}</h1>
            <p className='text-xs lg:text-sm text-gray-600'>{location}</p>
        </div>
        
       </div>
       <div className='mt-4 flex-1 flex flex-col'>
        <div className='flex flex-wrap gap-2 mb-2'>
            <h1 className='text-base lg:text-lg font-semibold'>{title}</h1>
            <p className='text-base lg:text-lg text-gray-700'>{type}</p>
        </div>
        <div className='flex gap-4 text-gray-600 mb-3 text-xs lg:text-sm'>
            <p>{salary}</p>
            <p>{posted}</p>
        </div>
        <div className=' bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 h-auto p-4 text-xs sm:text-sm rounded-lg mt-3'>
          <p className='leading-relaxed'>We are hiring an energetic UI/UX designer to join our company. You can send your CV by clicking Apply Now</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
        {["Finance", "Design", "Remote"].map((tag, index) => (
          <div
            key={index}
            className="px-3 py-1 border border-gray-300 rounded-2xl text-xs sm:text-sm bg-white/50 hover:bg-white transition-colors"
          >
            {tag}
          </div>
        ))}
      </div>
       </div>
       <div className='flex justify-between items-center mt-5 pt-4 border-t border-gray-200'>
            <p className='font-bold text-2xl '>$50 <span className='font-light text-sm'>/hour</span></p>
            <Button className='px-6 py-2 h-auto' onClick={()=>router.push('/jobseeker/applynow')}>Apply Now</Button>
       </div>
    </div>
  )
}

export default JobPostCard