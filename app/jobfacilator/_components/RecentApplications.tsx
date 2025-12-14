import { Button } from "@/components/ui/button";
import React from "react";
import RecentApplicationCard from "./RecentApplicationCard";

const RecentApplications = () => {
  return (
    <div className="w-full bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1>Recent Applications</h1>
        <Button className="w-fit lg:w-auto md:w-auto">View All</Button>
      </div>
 <div className="flex flex-col gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <RecentApplicationCard
            key={i}
            name="John Doe"
            appliedfor="Applied for HR Interns"
            appliedtime={2}
          />
        ))}
      </div>
      
    </div>
  );
};

export default RecentApplications;
