"use client";

import { Button } from "@/components/ui/button";

interface Job {
  title: string;
  company: string;
  location: string;
  logo?: string; 
}

interface RecommendedJobsProps {
  jobs: Job[];
  onSeeDetails?: (job: Job) => void; 
}

const RecommendedJobs: React.FC<RecommendedJobsProps> = ({ jobs, onSeeDetails }) => {
  if (!jobs || jobs.length === 0) return null;

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold">Recommended Jobs</h3>
      <div className="space-y-2">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg hover:shadow transition-shadow bg-white"
          >
            <div className="flex items-center gap-4">
              {job.logo ? (
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="w-12 h-12 object-contain rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                  Logo
                </div>
              )}
              <div>
                <p className="font-bold">{job.title}</p>
                <p className="text-sm text-gray-600">
                  {job.company} - {job.location}
                </p>
              </div>
            </div>
            <Button size="sm" onClick={() => onSeeDetails?.(job)}>
              See Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;
