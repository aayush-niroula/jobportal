import { Button } from '@/components/ui/button'

interface Props {
  event: {
    title: string;
    date: string;
    description: string;
    image_url?: string;
  };
}

const PastEventCard = ({ event }: Props) => {
  return (
    <div className='lg:max-h-[404px] lg:min-w-[361px] w-auto p-6 border border-black flex flex-col gap-2'>
      <div className='flex justify-center items-center'>
        <img
          src={event.image_url || "/why.jpg"}
          alt="event"
          className='max-h-[141px] min-w-[310px] object-contain'
        />
      </div>

      <h1 className='text-xl font-medium'>{event.title}</h1>

      <p className='font-light text-sm'>
        {new Date(event.date).toDateString()}
      </p>

      <div className='border border-black p-1 w-25 flex justify-center items-center'>
        Completed
      </div>

      <div>
        <p className='line-clamp-3'>
          {event.description}
        </p>
      </div>

      <Button className='w-28 p-6'>See Details</Button>
    </div>
  )
}

export default PastEventCard
