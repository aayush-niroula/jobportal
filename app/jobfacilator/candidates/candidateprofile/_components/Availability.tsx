import React from "react";

interface AvailabilityProps {
  availability?: string;
  expectedSalary?: string;
  workPreference?: string;
  jobType?: string;
}

const Availability = ({
  availability = "Not specified",
  expectedSalary = "Not specified",
  workPreference = "Not specified",
  jobType = "Not specified",
}: AvailabilityProps) => {
  return (
    <div className="font-playfair bg-white w-full h-auto lg:p-10 sm:p-6 p-4 flex flex-col gap-4 rounded-2xl border border-black">
      <h1 className="text-2xl font-bold">
        Availability & Expectations
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Availability</p>
          <p className="font-semibold">{availability}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Expected Salary</p>
          <p className="font-semibold">{expectedSalary}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Work Preference</p>
          <p className="font-semibold">{workPreference}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Job Type</p>
          <p className="font-semibold">{jobType}</p>
        </div>
      </div>
    </div>
  );
};

export default Availability;
