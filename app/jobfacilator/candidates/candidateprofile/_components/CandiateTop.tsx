import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Phone } from 'lucide-react'
interface ICandidateTop{
  candidatename:string
  location:string
  expericence:string,
  number?:number
}

const CandiateTop: React.FC<ICandidateTop> = ({ candidatename, location, expericence, number }) => {
  return (
    <div className='w-full bg-white rounded-2xl p-4 sm:p-6 lg:p-8 font-playfair flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6'>
            <img src="/goat.jpg" alt="picture" className='object-cover w-24 h-24 sm:w-28 sm:h-28  ' />
             <div className="flex flex-col gap-3">
          <h1 className="text-lg sm:text-xl font-bold">{candidatename}</h1>
          <div className="flex flex-col sm:flex-row sm:gap-6 text-sm sm:text-base text-gray-600">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {location}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {expericence}Years Experience
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" />{number}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-start sm:justify-end">
        <Button className="py-2 px-4 sm:py-3 sm:px-6" variant="outline">
          Add to Shortlist
        </Button>
      </div>
    </div>
  )
}

export default CandiateTop