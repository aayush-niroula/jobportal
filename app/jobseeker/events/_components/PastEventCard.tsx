import { Button } from '@/components/ui/button'
import React from 'react'

const PastEventCard = () => {
  return (
    <div className='lg:max-h-[404px] lg:min-w-[361px] w-auto p-6 border border-black flex flex-col gap-2'>
    <div className='flex justify-center items-center'>
     <img src="/why.jpg" alt="" className='max-h-[141px] min-w-[310px] object-contain'/>
        </div>
     <h1 className='text-xl font-medium'>Past Event Name</h1>
     <p className='font-light text-sm'>November20.2024</p>
     <div className='border border-black p-1 w-25 flex justify-center items-center'>
        Completed
     </div>

     <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, amet.</p>
     </div>

     <Button className='w-28 p-6'>See Details</Button>

    </div>
  )
}

export default PastEventCard