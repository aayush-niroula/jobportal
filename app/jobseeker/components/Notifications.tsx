import { Alert, AlertTitle } from '@/components/ui/alert'
import { Bell } from 'lucide-react'
import React from 'react'

const Notifications = () => {
  return (
    <div className='min-w-[335px] max-h-[495px] bg-white font-playfair border border-black rounded-2xl p-10'>
    <div className='flex gap-2 justify-center items-center'>
        <h1 className='font-bold text-2xl'>Recent Nofifications</h1>
        <Bell/>
    </div>
    <div className='p-2 flex flex-col gap-3 mt-2'>
      <Alert>
        <Bell />
        <AlertTitle>
          You have received notification
        </AlertTitle>
      </Alert>
      <Alert>
        <Bell />
        <AlertTitle>
          You have received notification
        </AlertTitle>
      </Alert>
      <Alert>
        <Bell />
        <AlertTitle>
          You have received notification
        </AlertTitle>
      </Alert>
      <Alert>
        <Bell />
        <AlertTitle>
          You have received notification
        </AlertTitle>
      </Alert>
      <Alert>
        <Bell />
        <AlertTitle>
          You have received notification
        </AlertTitle>
      </Alert>
    </div>
    </div>
  )
}

export default Notifications