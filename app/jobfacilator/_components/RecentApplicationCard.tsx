"use client"
import { useSocket } from '@/app/providers/SocketProvider';
import { useAuthStore } from '@/app/store/useAuthStore';
import { Button } from '@/components/ui/button'
import clsx from 'clsx';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { toast } from 'sonner';
type RecentApplication={
  id:string;
  applicationId:string
    name:string,
    appliedfor:string,
    appliedtime:number,
    skills:string[],
    seeker_image:string
    status: "PENDING" | "SCREENING" | "REJECTED" | "INTERVIEW";
}

const RecentApplicationCard = ({id,name,appliedfor,appliedtime,skills,seeker_image,applicationId,status}:RecentApplication) => {
    const router = useRouter()
     const user = useAuthStore(state => state.user)
  const socket = useSocket()
   const [currentStatus, setCurrentStatus] = useState(status)

  const [loading, setLoading] = useState(false)


   const updateStatus = async (status: "SCREENING" | "REJECTED") => {
    try {
      setLoading(true)

      const res = await fetch("/api/jobseeker/myapplications/status", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          applicationId: applicationId,
          status
        })
      })

      if (!res.ok) {
        toast.error("Failed to update status")
        return
      }
      setCurrentStatus(status)

      toast.success(
        status === "SCREENING"
          ? "Candidate shortlisted"
          : "Candidate rejected"
      )

    
      socket?.emit("send-notification", {
        userId: id,
        notification: {
          message: `Your application was ${status}`,
          type: "STATUS",
          created_at: new Date(),
          applicationId: id
        }
      })

    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }
  
    
  return (
    <div  className={clsx(
        "w-full bg-white border rounded-xl p-4 sm:p-6 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between transition",
        {
          "border-green-600 bg-green-50": currentStatus === "SCREENING",
          "border-red-600 bg-red-50": currentStatus === "REJECTED",
          "border-gray-300": currentStatus === "PENDING",
        }
      )}>
        <div className='flex gap-4'>
            <div className='flex flex-col justify-between'>
                <img src={seeker_image} alt="profilepicture" className='object-contain w-50 h-50 rounded-full' />
                <p className='text-xs font-light'>applied {appliedtime} hours ago</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-xl '>{name}</h1>
                <p className='font-light text-md'>{appliedfor}</p>
                <div className="flex flex-wrap gap-2 mt-2">
            {skills?.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs sm:text-sm border border-gray-400 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
            <Button onClick={()=>router.push(`/jobfacilator/candidates/candidateprofile/${id}`)} className='p-6 w-40 mt-6'>About Candidate</Button>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center sm:flex-row lg:flex-col gap-3 w-full sm:w-auto'>
           
            <Button
            onClick={()=>updateStatus("SCREENING")}
            className='px-15 w-32 bg-green-800' >{currentStatus === "SCREENING" ? "Shortlisted" : "Shortlist"}</Button>
            <Button
            onClick={()=>updateStatus("REJECTED")}
            className='px-15 w-32' variant={'destructive'}>{currentStatus === "REJECTED" ? "Rejected" : "Reject"}</Button>
        </div>

    </div>
  )
}

export default RecentApplicationCard