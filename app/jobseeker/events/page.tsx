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
import { Calendar, CalendarX, Search } from 'lucide-react'

const EmptyState = ({ type = 'upcoming' }) => {
  const isUpcoming = type === 'upcoming';
  
  return (
    <div className="text-center py-12 px-4">
      <div className="flex justify-center mb-4">
        {isUpcoming ? (
          <Calendar className="w-16 h-16 text-gray-300" />
        ) : (
          <CalendarX className="w-16 h-16 text-gray-300" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        {isUpcoming ? 'No Upcoming Events' : 'No Past Events'}
      </h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">
        {isUpcoming 
          ? 'There are no upcoming events at the moment. Check back soon for new and exciting events!'
          : 'No past events to display yet. Completed events will appear here.'}
      </p>
    </div>
  );
};

const LoadingState = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    ))}
  </div>
);

const page = () => {
  const params = useSearchParams();
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const page = Number(params.get("page") || 1);

  const {events, loading, error, totalPages, fieldCounts, categoryCounts} = useEvents({search, category, page})
  console.log(events);

  const now = new Date();

  const upcoming = events.filter(
    (e) => new Date(e.date) >= now
  );

  const past = events.filter(
    (e) => new Date(e.date) < now
  );

  const hasSearchOrFilter = search || category;

  return (
    <div className='flex flex-col justify-center items-center bg-[#F1F5F9] font-playfair p-10'>
      <EventSearchBar/>
      
      <div className='flex flex-col lg:flex-row justify-between gap-8 w-full max-w-7xl mt-6'>
        {/* Left Section - Upcoming Events */}
        <div className='flex-1 bg-white rounded-2xl p-6 sm:p-10'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='font-medium text-2xl'>Upcoming Events</h1>
            {upcoming.length > 0 && (
              <Button variant={'outline'} className='p-6 border-black mb-2'>
                View All
              </Button>
            )}
          </div>
          
          {loading && <LoadingState />}
          
          {error && (
            <div className="text-center py-12 px-4">
              <div className="flex justify-center mb-4">
                <Search className="w-16 h-16 text-red-300" />
              </div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Events</h3>
              <p className="text-sm text-gray-600">{error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <>
              <div className='flex flex-col gap-4 min-h-[400px]'>
                {upcoming.length === 0 ? (
                  <EmptyState type="upcoming" />
                ) : (
                  upcoming.map(event => <EventCard key={event.id} event={event} />)
                )}
              </div>

              {upcoming.length > 0 && totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} />
              )}
            </>
          )}
        </div>

        {/* Right Section - Filters */}
        <div className='flex flex-col gap-6 shrink-0 w-full lg:w-87.5'>
          <CategoryFilter categoryCounts={categoryCounts} />
          
          <FilterSection
            title="Related Fields"
            showLocation={false}
            queryKey='field'
            counts={fieldCounts}
            options={[
              { label: "Technology", value: "", count: 180 },
              { label: "Business", value: "", count: 42 },
              { label: "Marketing", value: "", count: 30 },
              { label: "Design", value: "", count: 20 },
            ]}
          />

          <FeaturedOrganizations/>
        </div>
      </div>

      {/* Past Events Section */}
      <div className='w-full max-w-7xl bg-white p-6 sm:p-10 rounded-2xl mt-6'>
        <div className='flex justify-between items-center mb-6'>
          <p className='text-xl font-bold'>Past Events</p>
          {past.length > 0 && <Button>View All</Button>}
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]'>
          {loading && (
            <div className="col-span-full">
              <LoadingState />
            </div>
          )}
          
          {!loading && past.length === 0 && (
            <div className="col-span-full">
              <EmptyState type="past" />
            </div>
          )}
          
          {!loading && past.length > 0 && past.map((event) => (
            <PastEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default page