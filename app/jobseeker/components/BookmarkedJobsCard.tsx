import { Job } from '@/app/types/types'
import { Button } from '@/components/ui/button'
import { Bookmark, Briefcase, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
interface BookmarkJobProps{
    job:Job
}

const BookmarkedJobsCard = ({job}:BookmarkJobProps) => {
    const router = useRouter()
  return (
    <div className='group p-4 border rounded-xl bg-card '>
        <div className='flex items-start justify-between gap-3'>
            <div className='sapce-y-1'>
                <h3 className='font-playfair font-medium text-base lg:text-lg'>{job.job_name}</h3>

                <div className='flex flex-wrap gap-3 text-sm text-muted-foreground'>
                    <span className='flex items-center gap-1'>
                     <Briefcase size={14}/>
                    {job.job_type}
                    </span>
                    <span className='flex items-center gap-1'>
                     <MapPin size={14}/>
                     {job.work_mode}
                    </span>
                </div>
            </div>
            <Bookmark
            size={18}
            className='text-muted-foreground group-hover:text-primary cursor-pointer'
            />
        </div>
        <div className='flex items-center justify-between mt-4'>
            <span className='text-xs text-muted-foreground'>
           {new Date().toLocaleString()}
            </span>
            <Button onClick={()=>router.push(`/jobseeker/applynow/${job.id}`)} variant={'ghost'} size={'sm'}>
            View Job
            </Button>
        </div>
    </div>
  )
}
export default BookmarkedJobsCard