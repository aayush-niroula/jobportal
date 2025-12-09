import { Button } from '@/components/ui/button'
import React from 'react'

const ProfileCompleteness = () => {
  return (
    <div className='min-w-[345px] max-h-[495px] bg-white font-playfair border border-black p-10 flex flex-col gap-4 rounded-2xl'>
        <h1 className='text-2xl font-bold'>Profile Completeness</h1>
        <div className='flex gap-2'>
            <input type="checkbox" />
            <label>Basic information</label>
        </div>
        <div className='flex gap-2'>
            <input type="checkbox" />
            <label>Resume Upload</label>
        </div>
        <div className='flex gap-2'>
            <input type="checkbox" />
            <label>Skills Added</label>
        </div>
        <div className='flex gap-2'>
            <input type="checkbox" />
            <label>Add Work Expericence</label>
        </div>
           <Button className='p-6'>Complete Profile</Button>
    </div>
  )
}

export default ProfileCompleteness