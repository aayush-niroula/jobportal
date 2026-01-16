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
  company_logo: string
  id: string
  maxWords?: number
}

const JobPostCard = ({
  title,
  company,
  company_logo,
  location,
  salary_min,
  salary_max,
  type,
  posted,
  description = "No description available",
  skills = [],
  id,
  maxWords = 25,
}: JobPostCardProps) => {
  const router = useRouter()

  const handleApply =async()=>{

  await fetch(`/api/jobseeker/increment-views`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({jobId:id})
  })
  

 router.push(`/jobseeker/applynow/${id}`)
}

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ")
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(" ") + "..."
  }

  const salaryDisplay = salary_min && salary_max
    ? `$${salary_min.toLocaleString()} - $${salary_max.toLocaleString()}`
    : salary_min
      ? `$${salary_min.toLocaleString()}`
      : salary_max
        ? `$${salary_max.toLocaleString()}`
        : "Salary not disclosed"

  return (
    <div className='border border-gray-200 rounded-2xl bg-white p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow h-full'>
  
      <div className='flex items-center gap-4 mb-4'>
        <img src={company_logo} alt="logo" className='object-contain h-16 w-20 rounded-lg'/>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg lg:text-xl font-medium'>{company || "Unknown Company"}</h1>
          <p className='text-xs lg:text-sm text-gray-600'>{location || "Unknown Location"}</p>
        </div>
      </div>

      <div className='flex flex-wrap gap-2 mb-2'>
        <h1 className='text-base lg:text-lg font-semibold'>{title}</h1>
        <p className='text-base lg:text-lg text-gray-700'>{type}</p>
      </div>

     
      <div className='flex gap-4 text-gray-600 mb-3 text-xs lg:text-sm'>
        <p>{salaryDisplay}</p>
        <p>{new Date(posted).toLocaleDateString()|| "Date not available"}</p>
      </div>

     
      <div className='bg-blue-50 h-16 sm:h-20 p-3 rounded-lg text-xs sm:text-sm overflow-hidden'>
        <p className='line-clamp-3'>
          {truncateText(description, maxWords)}
        </p>
      </div>

     
      <div className="flex gap-2 mt-3 overflow-x-auto whitespace-nowrap min-h-10">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 border border-gray-300 rounded-2xl text-xs sm:text-sm bg-white/50 hover:bg-white transition-colors shrink-0"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-xs sm:text-sm">No skills listed</span>
        )}
      </div>

     
      <div className='mt-auto pt-4 border-t border-gray-200 flex justify-end'>
        <Button className='px-6 py-2 h-auto' onClick={handleApply}>
          Apply Now
        </Button>
      </div>
    </div>
  )
}

export default JobPostCard
