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
    <div className='lg:min-w-[1120px] bg-white border border-black lg:flex-row flex flex-col gap-4 lg:justify-between p-6 justify-center items-center'>
        <div className='flex'>
            <div className='flex flex-col justify-between'>
                <img src="/Accounting.jpg" alt="profilepicture" className='object-contain w-50 h-50 rounded-full' />
                <p className='text-sm font-light'>applied {appliedtime} hours ago</p>
            </div>
            <div className='flex flex-col gap-3'>
                <h1 className='font-bold text-xl '>{name}</h1>
                <p className='font-light text-md'>{appliedfor}</p>
                <div className='lg:flex-row lg:gap-6 flex flex-col gap-4'>
                    <div className='p-2 border border-black flex items-center justify-center'>Decision Making</div>
                    <div className='p-2 border border-black flex items-center justify-center'>Decision Making</div>
                    <div className='p-2 border border-black flex items-center justify-center'>Decision Making</div>
                </div>
            <Button onClick={()=>router.push('/jobfacilator/candidates/candidateprofile')} className='p-6 w-40 mt-6'>About Candidate</Button>
            </div>
        </div>
        <div className='flex gap-4 lg:flex-col justify-center'>
            <button className='p-2 bg-green-400 w-40 rounded-sm'>Shortlist</button>
            <button className='p-2 bg-red-400 w-40 rounded-sm'>Reject</button>
        </div>

    </div>
  )
}

export default RecentApplicationCard