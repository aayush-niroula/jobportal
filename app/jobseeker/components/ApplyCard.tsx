"use client";
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ApplyCard = () => {
  const router = useRouter();

  return (
    <div className="w-full bg-white border border-border rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 flex flex-col gap-6 transition-shadow hover:shadow-md">
      {/* Top Row: Logo, Job Info, Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Company Logo */}
        <div className="shrink-0">
          <img
            src="/Logo.jpg"
            alt="Leapfrog Inc logo"
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-lg border"
          />
        </div>

        {/* Job Title + Company */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium font-playfair truncate">
            MERN Stack Developer
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground">Leapfrog Inc</p>
        </div>

        {/* Popular Badge */}
        <div className="self-start">
          <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full">
            Popular
          </span>
        </div>
      </div>

      {/* Middle Row: Details + Actions */}
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end">
        {/* Location, Salary, Type + Skills */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base text-muted-foreground">
            <span>Kathmandu</span>
            <span>•</span>
            <span>NPR 120k</span>
            <span>•</span>
            <span>Onsite</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-teal-100 text-teal-800 text-xs sm:text-sm px-3 py-1.5 rounded-full">
              React
            </span>
            <span className="bg-teal-100 text-teal-800 text-xs sm:text-sm px-3 py-1.5 rounded-full">
              Node.js
            </span>
            <span className="bg-teal-100 text-teal-800 text-xs sm:text-sm px-3 py-1.5 rounded-full">
              MongoDB
            </span>
          </div>
        </div>

        {/* Actions: Save + Apply */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            aria-label="Save job"
            className="p-2 sm:p-3 border border-border rounded-lg hover:bg-gray-50 transition"
          >
            <Bookmark className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <Button
            size="lg"
            className="px-6 py-3 sm:px-8"
            onClick={() => router.push('/jobseeker/applynow')}
          >
            Apply Now
          </Button>
        </div>
      </div>

      {/* Posted Date */}
      <div className="text-sm text-muted-foreground">
        Posted 3 days ago
      </div>
    </div>
  );
};

export default ApplyCard;