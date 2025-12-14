import { Alert, AlertTitle } from '@/components/ui/alert'
import { Bell } from 'lucide-react'
import React from 'react'

const Notifications = () => {
  return (
    <div className='lg:min-w-[335px] lg:max-h-[495px] bg-white font-playfair border border-black rounded-2xl p-10 md:w-xlw-full max-w-full bg-white border border-black rounded-2xl 
                 p-6 font-playfair 
                 md:max-w-[450px] lg:max-w-[380px]'>
    <div className='flex items-center justify-center gap-2 mb-4'>
        <h1 className='font-bold text-xl md:text-2xl'>Recent Nofifications</h1>
        <Bell className='hidden  md:block'/>
    </div>
    <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-2">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <Alert key={i} className="flex gap-3">
            <Bell className="mt-1" />
            <AlertTitle>You have received a notification</AlertTitle>
          </Alert>
        ))}
      </div>
    </div>
  )
}

export default Notifications