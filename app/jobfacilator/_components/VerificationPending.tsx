"use client"
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'


const VerificationPending = () => {
    const id = "1"
    const router = useRouter()
  return (
    <div>
         <div className="max-w-[597px] h-auto roundend-2xl border-2 border-amber-300 flex justify-between p-6 gap-2">
            <div className="flex flex-col gap-2">
                <p className="flex gap-2 font-medium text-xl"> <span><Clock/></span>Verification Pending</p>
                <p className="font-light text-sm">Please complete the verification process to post a job</p>
            </div>
            <div>
                <Button onClick={()=>router.push(`/jobfacilator/companyverification/${id}`)}>View Status</Button>
            </div>
        </div>
    </div>
  )
}

export default VerificationPending