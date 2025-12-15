import React from 'react'
import EventSearchBar from './_components/EventSearchBar'
import { Button } from '@/components/ui/button'
import EventCard from './_components/EventCard'
import FilterSection from '@/app/_components/FilterSection'
import PastEventCard from './_components/PastEventCard'
import Footer from '@/app/_components/Footer'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-[#F1F5F9] font-playfair p-10'>
        <EventSearchBar/>
        <div className='flex flex-col lg:flex-row justify-between gap-8 w-full max-w-7xl mt-6'>
            <div className='flex-1 bg-white rounded-2xl p-6 sm:p-10'>
                <div className='flex justify-between items-center mb-6'>
                <h1 className='font-medium text-2xl'>Upcomming Events</h1>
                <Button variant={'outline'} className='p-6 border-black mb-2'>View All</Button>
                </div>
                <div className='flex flex-col gap-4'>
                <EventCard/>
                <EventCard/>
                <EventCard/>
                <EventCard/>
                </div>
            </div>
            {/* right section  */}
            <div className='flex flex-col gap-6 shrink-0 w-full lg:w-87.5'>
            <div className="bg-white border border-black rounded-2xl p-6 flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Event Categories</h1>
            {['Career Fair', 'Workshop', 'Training', 'Webinar'].map((cat, idx) => (
              <div key={idx} className="p-3 border border-black w-full flex justify-between">
                <p>{cat}</p>
                <span>(5)</span>
              </div>
            ))}
          </div>
             <FilterSection
            title="Related Fileds"
            showLocation={false}
            options={[
              { label: "Technology", count: 180 },
              { label: "Business", count: 42 },
              { label: "Marketing", count: 30 },
              { label: "Design", count: 20 },
            
            ]}
          />

          {/* Featured Organization starts here */}
              <div className="bg-white border border-black rounded-2xl p-4">
            <h1 className="text-2xl sm:text-3xl font-medium text-center mb-4">Featured Organization</h1>
            {Array(4).fill(0).map((_, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 border-b last:border-b-0">
                <img src="/Logo.jpg" alt="logo" className="h-[60px] w-[60px] sm:h-[73px] sm:w-[73px] rounded-full object-contain" />
                <div className="flex flex-col gap-1">
                  <h2 className="font-medium text-lg sm:text-xl">Organization Name</h2>
                  <p className="text-sm font-light">14 events</p>
                </div>
              </div>
            ))}
          </div>

          {/* ends here  */}

          {/* host an event starts here  */}

          <div className='bg-white p-6 flex flex-col border border-black rounded-2xl gap-4'>
            <h1 className='text-3xl font-bold '>Host an Event</h1>
            <p className='text-md font-light'>Share your expertise and connect with professionals</p>
            <Button className='p-6'>Create Event</Button>
          </div>

          {/* ends here */}

            </div>

           
           
        </div>
{/* next section start vayo  */}
  <div className='w-full max-w-7xl bg-white sm:p-10 rounded-2xl mt-6'>
    <p className='flex justify-between items-center text-xl font-bold mb-4'>Past Events <Button>View All</Button></p>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

    <PastEventCard/>
    <PastEventCard/>
    <PastEventCard/>
    <PastEventCard/>
    <PastEventCard/>
    <PastEventCard/>
    </div>
  </div>

  {/* section finished  */}

  <Footer/>



    </div>
  )
}

export default page