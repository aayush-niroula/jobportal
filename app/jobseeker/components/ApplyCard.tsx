"use client"
import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react'
import { useRouter } from 'next/navigation'



const ApplyCard = () => {
  const router = useRouter()
  return (
    <div className='lg:min-w-[839px] lg:max-h-[277px] bg-white border border-black font-playfair flex flex-col gap-4 p-8'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='relative'>
           <img src="/Logo.jpg" alt="popularjobposts" className='object- h-[50px] w-[50px]'/>
        </div>
        <div className='flex flex-col gap-2 absolute left-40'>
            <h1 className='lg:text-2xl text-sm'>MERN stack Developer</h1>
            <p className='lg:text-md text-sm'>Leapfrog.Inc</p>
        </div>
        <div className='bg-green-300 lg:p-3 p-1 rounded-xl  w-fit flex justify-center items-center '>
            popular
        </div>
      </div>
      <div className='flex flex-col gap-2 justify-center md:flex-row md:justify-between lg:flex-row lg:justify-between '>
        <div className='flex flex-col gap-4'>
        <div className='flex gap-3 text-gray-700 text-sm md:text-base'>
            <p>Kathmandu</p>
            <p>120k</p>
            <p>Onsite</p>
        </div>
        <div className='flex gap-2 text-sm  lg:text-xl '>
            <p className='bg-[#B2D3D3] p-1 rounded-xl'>React</p>
            <p className='bg-[#B2D3D3] p-1 rounded-xl'>Nodejs</p>
            <p className='bg-[#B2D3D3] p-1 rounded-xl'>MongoDb</p>
        </div>
        </div>
        <div className='flex gap-4 lg:justify-center items-center'>
           <p className='border border-black lg:p-2 p-1 rounded-sm'><Bookmark/></p>
            <Button className='lg:p-6' onClick={()=>router.push('/jobseeker/applynow')}>Apply Now</Button>
        </div>
      </div>

      <div>
         posted 3 days ago
      </div>
    </div>
  )
}

export default ApplyCard