"use client"
import EventSearchBar from './_components/EventSearchBar'
import { Button } from '@/components/ui/button'
import EventCard from './_components/EventCard'
import FilterSection from '@/app/_components/FilterSection'
import PastEventCard from './_components/PastEventCard'
import Footer from '@/app/_components/Footer'
import { useSearchParams } from 'next/navigation'
import { useEvents } from '@/app/hooks/useEvents'
import CategoryFilter from './_components/CategoryFilter'
import FeaturedOrganizations from './_components/FeaturedOrganizations'
import Pagination from './_components/Pagination'

const page = () => {
  const params = useSearchParams();
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const page = Number(params.get("page") || 1);

  const {events,loading,error,totalPages,fieldCounts,categoryCounts} =useEvents({search,category,page})
console.log(events);


   const now = new Date();

  const upcoming = events.filter(
    (e) => new Date(e.date) >= now
  );

  const past = events.filter(
    (e) => new Date(e.date) < now
  );


  
 

  return (
    <div className='flex flex-col justify-center items-center bg-[#F1F5F9] font-playfair p-10'>
        <EventSearchBar/>
        <div className='flex flex-col lg:flex-row justify-between gap-8 w-full max-w-7xl mt-6'>
            <div className='flex-1 bg-white rounded-2xl p-6 sm:p-10'>
                <div className='flex justify-between items-center mb-6'>
                <h1 className='font-medium text-2xl'>Upcomming Events</h1>
                <Button variant={'outline'} className='p-6 border-black mb-2'>View All</Button>
                </div>
                 {loading && <p>Loading...</p>}
             {error && <p>{error}</p>}
                <div className='flex flex-col gap-4'>
                  {
                    upcoming.map((event)=>(
                        <EventCard key={event.id} event={event}/>
                    ))
                  }
            
                </div>
                <Pagination
                page={page}
                totalPages={totalPages}
                />
            </div>
            {/* right section  */}
            <div className='flex flex-col gap-6 shrink-0 w-full lg:w-87.5'>

            <CategoryFilter
            categoryCounts={categoryCounts}
            />
          
             <FilterSection
            title="Related Fields"
            showLocation={false}
            queryKey='field'
            counts={fieldCounts}

            options={[
              { label: "Technology", count: 180 },
              { label: "Business", count: 42 },
              { label: "Marketing", count: 30 },
              { label: "Design", count: 20 },
            
            ]}
          />

  <FeaturedOrganizations/>

          {/* ends here  */}


            </div>

           
           
        </div>
{/* next section start vayo  */}
  <div className='w-full max-w-7xl bg-white sm:p-10 rounded-2xl mt-6'>
    <p className='flex justify-between items-center text-xl font-bold mb-4'>Past Events <Button>View All</Button></p>
   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

  {past.length === 0 ? (
    <div className="col-span-full text-center text-gray-500 py-10">
      <p className="text-lg font-medium">No past events found</p>
      <p className="text-sm">Check back later for completed events</p>
    </div>
  ) : (
    past.map((event) => (
      <PastEventCard key={event.id} event={event} />
    ))
  )}

</div>

  </div>

  {/* section finished  */}

  <Footer/>





    </div>
  )
}

export default page