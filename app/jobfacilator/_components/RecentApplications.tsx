import { Button } from "@/components/ui/button";
import React from "react";
import RecentApplicationCard from "./RecentApplicationCard";

const RecentApplications = () => {
  return (
    <div className="min-w-[1269px] h-auto bg-white p-10 rounded-2xl">
      <div className="flex justify-between mb-">
        <h1>Recent Applications</h1>
        <Button>View All</Button>
      </div>
      <div className="flex flex-col gap-4">
      <RecentApplicationCard
        name="John Doe"
        appliedfor="Applied for HR interns"
        appliedtime={2}
      />
      <RecentApplicationCard
        name="John Doe"
        appliedfor="Applied for HR interns"
        appliedtime={2}
      />
      <RecentApplicationCard
        name="John Doe"
        appliedfor="Applied for HR interns"
        appliedtime={2}
      />
      <RecentApplicationCard
        name="John Doe"
        appliedfor="Applied for HR interns"
        appliedtime={2}
      />
      </div>
      
    </div>
  );
};

export default RecentApplications;
