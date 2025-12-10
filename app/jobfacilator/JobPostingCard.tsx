import { Button } from '@/components/ui/button'
interface JobPostingtype{
    JobName:string,
    Location:string,
    JobType:string,
    ApplicationNo:number,
    ReviewedNo:number,
    ShortlistedNo:number,
    ViewsNo:number
}

const JobPostingCard = ({JobName,Location,JobType,ApplicationNo,ReviewedNo,ShortlistedNo,ViewsNo}:JobPostingtype) => {
  return (
    <div className='min-w-[705px] border border-black bg-white font-playfair p-6'>
    <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-2'>
           <h1 className='text-xl font-bold'>{JobName}</h1>
           <p className='text-sm flex gap-8 font-medium'>{Location} <span>{JobType}</span></p>
        </div>
        <div>
            <Button variant={'outline'}>Edit</Button>
        </div>
    </div>
    <div className='flex gap-4 '>
        <div className='flex flex-col gap-2'>
        <p className='font-medium text-xl'>Applications</p>
        <p className='text-2xl font-bold'>{ApplicationNo}</p>
        </div>
        <div  className='flex flex-col gap-2'>
        <p className='font-medium text-xl'>Reviewed</p>
        <p className='text-2xl font-bold'>{ReviewedNo}</p>
        </div>
        <div  className='flex flex-col gap-2'>
        <p className='font-medium text-xl'>Shortlisted</p>
        <p className='text-2xl font-bold'>{ShortlistedNo}</p>
        </div>
        <div  className='flex flex-col gap-2'>
        <p className='font-medium text-xl'>Views</p>
        <p className='text-2xl font-bold'>{ViewsNo}</p>
        </div>
    </div>

    </div>
  )
}

export default JobPostingCard