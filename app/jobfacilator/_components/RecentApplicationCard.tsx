"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
type RecentApplication={
    name:string,
    appliedfor:string,
    appliedtime:number
}

const RecentApplicationCard = ({name,appliedfor,appliedtime}:RecentApplication) => {
    const router = useRouter()
  return (
    <div className='w-full bg-white border border-gray-300 rounded-xl p-4 sm:p-6 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between'>
        <div className='flex gap-4'>
            <div className='flex flex-col justify-between'>
                <img src="/Accounting.jpg" alt="profilepicture" className='object-contain w-50 h-50 rounded-full' />
                <p className='text-xs font-light'>applied {appliedtime} hours ago</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-xl '>{name}</h1>
                <p className='font-light text-md'>{appliedfor}</p>
                <div className="flex flex-wrap gap-2 mt-2">
            {["Decision Making", "Teamwork", "Leadership"].map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs sm:text-sm border border-gray-400 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
            <Button onClick={()=>router.push('/jobfacilator/candidates/candidateprofile')} className='p-6 w-40 mt-6'>About Candidate</Button>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center sm:flex-row lg:flex-col gap-3 w-full sm:w-auto'>
           
            <Button className='px-15 w-32 bg-green-800' >Shortlist</Button>
            <Button className='px-15 w-32' variant={'destructive'}>Reject</Button>
        </div>

    </div>
  )
}

export default RecentApplicationCard