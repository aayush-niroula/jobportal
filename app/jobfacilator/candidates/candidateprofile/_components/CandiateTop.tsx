import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Phone } from 'lucide-react'
import React from 'react'

const CandiateTop = () => {
  return (
    <div className='h-auto max-w-[1248px] bg-white flex justify-between p-8 font-playfair gap-10'>
        <div className='flex gap-6'>
            <img src="/goat.jpg" alt="picture" className='object-cover max-h-[103px] min-w-[103px] ' />
            <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold '>John Doe</h1>
            <div className='flex gap-4 '>
                <p className='flex gap-4 text-md font-light'><MapPin/><span>San Francisco</span></p>
                <p className='flex gap-4 text-md font-light'><Calendar/><span>Experience</span></p>
                <p className='flex gap-4 text-md font-light'><Phone/><span>Contact</span></p>
            </div>
        </div>
        </div>
        
        <div className='flex justify-between items-center'>
            <Button className='p-6' variant={'outline'}>Add to Shortlist</Button>
        </div>

    </div>
  )
}

export default CandiateTop