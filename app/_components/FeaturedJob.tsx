"use client";
import { Button } from "@/components/ui/button";
import { Briefcase, CircleDollarSign, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Job } from "../types/types";

interface FeaturedJobProps {
  job: Job;
}

const FeaturedJob = ({ job }: FeaturedJobProps) => {
  const router = useRouter();

  const salaryDisplay =
    job.salary_min && job.salary_max
      ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
      : job.salary_min
      ? `$${job.salary_min.toLocaleString()}`
      : job.salary_max
      ? `$${job.salary_max.toLocaleString()}`
      : "Salary not disclosed";

  return (
    <div
      className="w-full bg-white border border-gray-200 rounded-2xl
      p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row items-center gap-4 lg:gap-8 font-playfair"
    >
      <Image
        src={job.facilitator?.company_logo || "/Logo.jpg"}
        alt={`${job.facilitator?.company_name} Logo`}
        width={160}
        height={160}
        className="rounded-lg object-contain w-28 h-28 lg:w-32 lg:h-32 md:w-44 md:h-44"
      />

      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-lg sm:text-xl md:text-2xl">{job?.job_name}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Briefcase />
            <p className="text-extralight">{job?.job_type}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin />
            <p className="text-extralight">{job?.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock />
            <p className="text-extralight">{job?.work_mode}</p>
          </div>
          <div className="flex items-center gap-2">
            <CircleDollarSign />
            <p className="text-extralight">{salaryDisplay}</p>
          </div>
        </div>
      </div>

      <div className="shrink-0 mt-2 lg:mt-0">
        <Button
          className="w-full lg:w-auto py-2 sm:py-3 px-4 sm:px-6"
          onClick={() => router.push(`/jobseeker/applynow/${job.id}`)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default FeaturedJob;
