"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const GetStarted = () => {
  const router = useRouter()
  return (
    <div className='font-playfair mt-10 flex flex-col gap-4'>
        <h1 className='lg:text-4xl text-2xl  font-bold text-center'>Ready to get started</h1>
        <p className='text-sm font-light text-center'>Your gateway to opportunities and the right talent</p>

        <div className='lg:flex-row md:flex-row flex flex-col gap-4 justify-center items-center mt-10'>
          <Button className='lg:p-10 md:p-8 p-6' onClick={()=>router.push('/register')}>SIGNUP AS A JOBSEEKER</Button>
          <Button className='lg:p-10 md:p-8 p-6 ' onClick={()=>router.push('/register')} variant={'outline'}>POST AS A FACILATOR</Button>
        </div>
    </div>
  )
}

export default GetStarted