"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type JobPostCardProps = {
  title: string
  company: string
  location: string
  salary_min?: number | null
  salary_max?: number | null
  type: string
  posted: string
  description?: string
  skills?: string[]
  id:string
}

const JobPostCard = ({
  title,
  company,
  location,
  salary_min,
  salary_max,
  type,
  posted,
  description = "No description available",
  skills = [],
  id
}: JobPostCardProps) => {
  const router = useRouter()

  
  const salaryDisplay = salary_min && salary_max
    ? `$${salary_min.toLocaleString()} - $${salary_max.toLocaleString()}`
    : salary_min
      ? `$${salary_min.toLocaleString()}`
      : salary_max
        ? `$${salary_max.toLocaleString()}`
        : "Salary not disclosed"

  return (
    <div className='border border-gray-200 rounded-2xl bg-linear-to-br from-white to-slate-50 p-5 w-full flex flex-col h-full shadow-sm hover:shadow-md transition-shadow'>
       <div className='flex items-center gap-4'>
        <img src="Logo.jpg" alt="" className='object-contain h-16 w-20 rounded-lg'/>
        <div className='flex flex-col gap-2'>
            <h1 className='text-lg lg:text-xl font-medium'>{company || "Unknown Company"}</h1>
            <p className='text-xs lg:text-sm text-gray-600'>{location || "Unknown Location"}</p>
        </div>
       </div>

       <div className='mt-4 flex-1 flex flex-col'>
        <div className='flex flex-wrap gap-2 mb-2'>
            <h1 className='text-base lg:text-lg font-semibold'>{title}</h1>
            <p className='text-base lg:text-lg text-gray-700'>{type}</p>
        </div>
        <div className='flex gap-4 text-gray-600 mb-3 text-xs lg:text-sm'>
            <p>{salaryDisplay}</p>
            <p>{posted || "Date not available"}</p>
        </div>

        <div className='bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 h-auto p-4 text-xs sm:text-sm rounded-lg mt-3'>
          <p className='leading-relaxed'>{description}</p>
        </div>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={index}
                className="px-3 py-1 border border-gray-300 rounded-2xl text-xs sm:text-sm bg-white/50 hover:bg-white transition-colors"
              >
                {skill}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-xs sm:text-sm">No skills listed</div>
          )}
        </div>
       </div>

       <div className='flex justify-between items-center mt-5 pt-4 border-t border-gray-200'>
            <Button className='px-6 py-2 h-auto' onClick={()=>router.push(`/jobseeker/applynow/${id}`)}>
              Apply Now
            </Button>
       </div>
    </div>
  )
}

export default JobPostCard
