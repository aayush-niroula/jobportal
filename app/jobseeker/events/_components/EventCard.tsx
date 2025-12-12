import { Button } from '@/components/ui/button'
import { CalendarRange, MapPin } from 'lucide-react'
import React from 'react'

const EventCard = () => {
  return (
    <div className='bg-white border border-black lg:max-h-[323px] lg:max-w-[775px] w-auto h-auto flex p-4 font-playfair gap-4'>
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center '>
                <h1 className='font-bold text-2xl'>Event Name - Carrier Fair</h1>
                <div className='border border-black p-3 rounded-sm'>Workshop</div>
            </div>
            <div className='bg-[#FEEFEF]'>
                <p className='font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam consectetur vero neque consequatur consequuntur suscipit explicabo, eveniet libero voluptatum facere error totam itaque quis, labore perferendis aperiam? Minus, quibusdam.</p>
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <p className='flex gap-2'><span><CalendarRange/></span>January 5,2026</p>
                <p className='flex gap-2'><span><MapPin/></span>10AM-4PM</p>
                <p className='flex gap-2'><span><MapPin/></span>Biratnagar</p>
                <p className='flex gap-2'><span><MapPin/></span>250 registered</p>
               
            </div>
            <div className='flex gap-4'>
                <Button className='p-6'>Register</Button> 
                <Button variant={'outline'} className='border-black p-6'>Learn More</Button> 
            </div>
        </div>
        <div>
            <img src="/Logo.jpg" alt=""  className='object-cover max-h-[127px] rounded-2xl'/>
        </div>
    </div>
  )
}

export default EventCard