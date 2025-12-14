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
    <div className='w-full max-w-5xl mx-auto border border-black bg-white font-playfair p-4 sm:p-6 rounded-lg shadow-sm'>
    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
        <div className='flex flex-col gap-2'>
           <h1 className='text-xl font-bold'>{JobName}</h1>
           <p className='text-sm flex gap-8 font-medium'>{Location} <span>{JobType}</span></p>
        </div>
        <div>
            <Button variant={'outline'}>Edit</Button>
        </div>
    </div>
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 '>
        <div className='flex flex-col gap-2'>
        <p className='font-medium lg:text-xl'>Applications</p>
        <p className='lg:text-2xl text-xl font-bold'>{ApplicationNo}</p>
        </div>
        <div  className='flex flex-col gap-2'>
        <p className='font-medium lg:text-xl'>Reviewed</p>
        <p className='lg:text-2xl text-xl font-bold'>{ReviewedNo}</p>
        </div>
        <div  className='flex flex-col gap-2'>
        <p className='font-medium lg:text-xl'>Shortlisted</p>
        <p className='lg:text-2xl text-xl font-bold'>{ShortlistedNo}</p>
        </div>
        <div  className='flex flex-col gap-2'>
        <p className='font-medium lg:text-xl'>Views</p>
        <p className='lg:text-2xl text-xl font-bold'>{ViewsNo}</p>
        </div>
    </div>

    </div>
  )
}

export default JobPostingCard