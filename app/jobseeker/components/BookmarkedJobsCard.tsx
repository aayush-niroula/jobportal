import { Button } from '@/components/ui/button'
import { Bookmark, Briefcase, MapPin } from 'lucide-react'
import React from 'react'

const BookmarkedJobsCard = () => {
  return (
    <div className='group p-4 border rounded-xl bg-card '>
        <div className='flex items-start justify-between gap-3'>
            <div className='sapce-y-1'>
                <h3 className='font-playfair font-medium text-base lg:text-lg'>Frontend Developer</h3>

                <div className='flex flex-wrap gap-3 text-sm text-muted-foreground'>
                    <span className='flex items-center gap-1'>
                     <Briefcase size={14}/>
                     Full-time
                    </span>
                    <span className='flex items-center gap-1'>
                     <MapPin size={14}/>
                     Remote
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
            Saved 2 days ago
            </span>
            <Button variant={'ghost'} size={'sm'}>
            View Job
            </Button>
        </div>
    </div>
  )
}
export default BookmarkedJobsCard