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
        <div className='flex justify-between mt-10 gap-20'>
            <div className='bg-white rounded-2xl h-auto min-w-[885px] p-10'>
                <div className='flex justify-between items-center'>
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
            <div className='flex flex-col gap-4'>
            <div className='bg-white border border-black min-w-[372] max-h-[414px] rounded-2xl p-8 flex flex-col  gap-4'>
                <h1 className='font-bold text-2xl'>Event Categories</h1>
                <div className='p-3 border border-black min-w-[290] '>
                    <p className='flex justify-between'>Carrier fair <span>(5)</span></p>
                </div>
                <div className='p-3 border border-black min-w-[290] '>
                    <p className='flex justify-between'>Workshop <span>(5)</span></p>
                </div>
                <div className='p-3 border border-black min-w-[290] '>
                    <p className='flex justify-between'>Training <span>(5)</span></p>
                </div>
                <div className='p-3 border border-black min-w-[290] '>
                    <p className='flex justify-between'>Webinar <span>(5)</span></p>
                </div>
               
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
          <div className='min-w-[414px] max-h-auto bg-white rounded-2xl border border-black'>

            <h1 className='text-3xl font-medium text-center p-2'>Featured Organization</h1>

            <div className='flex p-8 gap-4'>
                <img src="/Logo.jpg" alt="logo" className='object-contain h-[73px] w-[73px] rounded-full' />
                <div className='flex flex-col gap-2'>
                    <h1 className='font-medium text-xl'>Organization name</h1>
                    <p className='text-sm font-light'>14 events</p>
                </div>
            </div>
            <div className='flex p-8 gap-4'>
                <img src="/Logo.jpg" alt="logo" className='object-contain h-[73px] w-[73px] rounded-full' />
                <div className='flex flex-col gap-2'>
                    <h1 className='font-medium text-xl'>Organization name</h1>
                    <p className='text-sm font-light'>14 events</p>
                </div>
            </div>
            <div className='flex p-8 gap-4'>
                <img src="/Logo.jpg" alt="logo" className='object-contain h-[73px] w-[73px] rounded-full' />
                <div className='flex flex-col gap-2'>
                    <h1 className='font-medium text-xl'>Organization name</h1>
                    <p className='text-sm font-light'>14 events</p>
                </div>
            </div>
            <div className='flex p-8 gap-4'>
                <img src="/Logo.jpg" alt="logo" className='object-contain h-[73px] w-[73px] rounded-full' />
                <div className='flex flex-col gap-2'>
                    <h1 className='font-medium text-xl'>Organization name</h1>
                    <p className='text-sm font-light'>14 events</p>
                </div>
            </div>


          </div>
          {/* ends here  */}

          {/* host an event starts here  */}

          <div className='p-6 flex flex-col border border-black rounded-2xl gap-4'>
            <h1 className='text-3xl font-bold '>Host an Event</h1>
            <p className='text-md font-light'>Share your expertise and connect with professionals</p>
            <Button className='p-6'>Create Event</Button>
          </div>

          {/* ends here */}

            </div>

           
           
        </div>
{/* next section start vayo  */}
  <div className='w-full h-auto bg-white p-10 rounded-2xl mt-6'>
    <p className='flex justify-between items-center text-xl font-bold mb-4'>Past Events <Button>View All</Button></p>
    <div className='grid grid-cols-3 gap-4'>

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