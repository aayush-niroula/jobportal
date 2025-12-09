import { Button } from '@/components/ui/button'
import React from 'react'

const GetStarted = () => {
  return (
    <div className='font-playfair mt-10 flex flex-col gap-4'>
        <h1 className='text-4xl font-bold text-center'>Ready to get started</h1>
        <p className='text-sm font-light text-center'>Your gateway to opportunities and the right talent</p>

        <div className='flex gap-4 justify-center items-center mt-10'>
          <Button className='p-10' >SIGNUP AS A JOBSEEKER</Button>
          <Button className='p-10' variant={'outline'}>POST AS A FACILATOR</Button>
        </div>
    </div>
  )
}

export default GetStarted