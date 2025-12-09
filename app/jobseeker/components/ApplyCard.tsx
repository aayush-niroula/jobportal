"use client"
import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react'
import { useRouter } from 'next/navigation'



const ApplyCard = () => {
  const router = useRouter()
  return (
    <div className='min-w-[839px] max-h-[277px] bg-white border border-black font-playfair flex flex-col gap-4 p-8'>
      <div className='flex justify-between'>
        <div className='relative'>
           <img src="/Logo.jpg" alt="popularjobposts" className='object- h-[50px] w-[50px]'/>
        </div>
        <div className='flex flex-col gap-2 absolute left-40'>
            <h1>MERN stack Developer</h1>
            <p>Leapfrog.Inc</p>
        </div>
        <div className='bg-green-300 p-3 rounded-xl flex justify-center items-center '>
            popular
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
            <p>Kathmandu</p>
            <p>120k</p>
            <p>Onsite</p>
        </div>
        <div className='flex gap-2 '>
            <p className='bg-[#B2D3D3] p-1 rounded-xl'>React</p>
            <p className='bg-[#B2D3D3] p-1 rounded-xl'>Nodejs</p>
            <p className='bg-[#B2D3D3] p-1 rounded-xl'>MongoDb</p>
        </div>
        </div>
        <div className='flex gap-4 justify-center items-center'>
           <p className='border border-black p-2 rounded-sm'><Bookmark/></p>
            <Button className='p-6' onClick={()=>router.push('/jobseeker/applynow')}>Apply Now</Button>
        </div>
      </div>

      <div>
         posted 3 days ago
      </div>
    </div>
  )
}

export default ApplyCard