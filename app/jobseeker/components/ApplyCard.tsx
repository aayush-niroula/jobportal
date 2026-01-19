"use client";
import { useAuthStore } from '@/app/store/useAuthStore';
import { Job } from '@/app/types/types';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {useState } from 'react';

interface ApplyCardProps {
  job: Job;
  onToggleBookmark?:()=>void
}
const ApplyCard = ({job,onToggleBookmark}:ApplyCardProps) => {
  const router = useRouter();
  const user = useAuthStore(state => state.user)
    const job_id = job.id
    const [isBookmarked,setIsBookmarked] = useState(job.isBookmarked || false)

  const toggleBookmark = async () => {
  const res =await fetch("/api/bookmark", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify({ job_id }),
  });

  const data = await res.json()
 if(res.ok){
  setIsBookmarked(data.bookmarked);
  if(onToggleBookmark) onToggleBookmark()
 }
};

const handleApply =async()=>{

  await fetch(`/api/jobseeker/increment-views`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({jobId:job_id}),
    keepalive:true
  })
  

 router.push(`/jobseeker/applynow/${job.id}`)
}




  return (
    <div className="w-full bg-white border border-border rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 flex flex-col gap-6 transition-shadow hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Company Logo */}
        <div className="shrink-0">
          <img
            src="/Logo.jpg"
            alt="Leapfrog Inc logo"
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-lg border"
          />
        </div>

   
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium font-playfair truncate">
           {job.job_name}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground">{job.facilitator.company_name}</p>
        </div>

      
        <div className="self-start">
          <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full">
            Popular
          </span>
        </div>
      </div>

      {/* Middle Row: Details + Actions */}
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end">
        {/* Location, Salary, Type + Skills */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base text-muted-foreground">
            <span>{job.location}</span>
            <span>•</span>
            <span>NPR {job.salary_max}-{job.salary_min}</span>
            <span>•</span>
            <span>{job.work_mode}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {
              job.skills.map((skill:any)=>(
            <span key={skill} className="bg-teal-100 text-teal-800 text-xs sm:text-sm px-3 py-1.5 rounded-full">
              {skill}
            </span>
              ))

            }
           
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            aria-label="Save job"
            className="p-2 sm:p-3 border border-border rounded-lg hover:bg-gray-50 transition"
            onClick={toggleBookmark}
          >
              <Bookmark
              className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors ${
                isBookmarked ? "text-red-500" : "text-gray-400"
              }`}
            />
          </button>
          <Button
            size="lg"
            className="px-6 py-3 sm:px-8"
            onClick={handleApply }
          >
            Apply Now
          </Button>
        </div>
      </div>

      {/* Posted Date */}
      <div className="text-sm text-muted-foreground">
       {new Date(job.created_at).toLocaleString()}
      </div>
    </div>
  );
};

export default ApplyCard;