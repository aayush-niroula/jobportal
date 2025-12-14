import { Button } from '@/components/ui/button'
import React from 'react'

const ProfileCompleteness = () => {
  return (
    <div className='lg:min-w-[380px] md:max-w-[450px] w-full bg-white font-playfair border border-black p-10 flex flex-col gap-5 rounded-2xl flex-wrap '>
        <h1 className='text-2xl font-bold'>Profile Completeness</h1>
        <div className='flex gap-2 items-center'>
            <input type="checkbox" />
            <label>Basic information</label>
        </div>
        <div className='flex gap-2 items-center'>
            <input type="checkbox" />
            <label>Resume Upload</label>
        </div>
        <div className='flex gap-2 items-center'>
            <input type="checkbox" />
            <label>Skills Added</label>
        </div>
        <div className='flex gap-2 items-center'>
            <input type="checkbox" />
            <label>Add Work Expericence</label>
        </div>
           <Button className='py-4 text-lg w-full md:w-auto '>Complete Profile</Button>
    </div>
  )
}

export default ProfileCompleteness