import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase } from 'lucide-react';

interface JobPostingType {
  JobName: string;
  Location: string;
  JobType: string;
  ApplicationNo: number;
  ReviewedNo: number;
  ShortlistedNo: number;
  ViewsNo: number;
}

const JobPostingCard = ({
  JobName,
  Location,
  JobType,
  ApplicationNo,
  ReviewedNo,
  ShortlistedNo,
  ViewsNo
}: JobPostingType) => {
  return (
    <Card className="w-full font-playfair p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer group hover:translate-x-0.5 hover:translate-y-0.5">
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 pb-4 border-b-2 border-gray-200'>
        <div className='flex flex-col gap-2 flex-1'>
          <h2 className='text-xl font-bold text-black group-hover:underline transition-all'>
            {JobName}
          </h2>
          <div className='flex flex-wrap items-center gap-3 text-sm text-gray-600'>
            <div className='flex items-center gap-1.5'>
              <MapPin className='h-4 w-4' />
              <span className='font-medium'>{Location}</span>
            </div>
            <Badge variant="outline" className='gap-1.5 border-black'>
              <Briefcase className='h-3 w-3' />
              {JobType}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <div className='flex flex-col gap-2 p-3 border-2 border-black rounded-lg bg-white hover:bg-gray-50 transition-colors'>
          <p className='font-medium text-base text-gray-600'>Applications</p>
          <p className='text-2xl font-bold text-black'>{ApplicationNo}</p>
        </div>
        
        <div className='flex flex-col gap-2 p-3 border-2 border-black rounded-lg bg-white hover:bg-gray-50 transition-colors'>
          <p className='font-medium text-base text-gray-600'>Reviewed</p>
          <p className='text-2xl font-bold text-black'>{ReviewedNo || 0}</p>
        </div>
        
        <div className='flex flex-col gap-2 p-3 border-2 border-black rounded-lg bg-white hover:bg-gray-50 transition-colors'>
          <p className='font-medium text-base text-gray-600'>Shortlisted</p>
          <p className='text-2xl font-bold text-black'>{ShortlistedNo || 0}</p>
        </div>
        
        <div className='flex flex-col gap-2 p-3 border-2 border-black rounded-lg bg-white hover:bg-gray-50 transition-colors'>
          <p className='font-medium text-base text-gray-600'>Views</p>
          <p className='text-2xl font-bold text-black'>{ViewsNo || 0}</p>
        </div>
      </div>
    </Card>
  );
};

export default JobPostingCard;