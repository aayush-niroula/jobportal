"use client"
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import RecentApplicationCard from "./RecentApplicationCard";
import { useAuthStore } from "@/app/store/useAuthStore";
import { FileText, ArrowRight } from "lucide-react";

const RecentApplications = () => {
  const user = useAuthStore(state => state.user);
  const [recentapplication, setRecentApplications] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchRecentApplications = async () => {
      const res = await fetch("/api/jobfacilator/recentapplications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setRecentApplications(data);
      } else {
        console.log("API Error:", data);
        setRecentApplications([]);
      }
    };

    fetchRecentApplications();
  }, [user?.token]);

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 pb-4 border-b-2 border-black">
        <h2 className="text-xl font-bold text-black flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Recent Applications
        </h2>
        <Button className="w-fit bg-black text-white hover:bg-gray-800 border-2 border-black gap-2">
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {recentapplication?.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-black mb-1">No recent applications</p>
            <p className="text-sm text-gray-600">New applications will appear here</p>
          </div>
        ) : (
          recentapplication?.map((application, i) => (
            <RecentApplicationCard
              key={i}
              id={application?.seeker?.id}
              name={application?.seeker?.user?.name}
              appliedfor={application?.job?.job_name}
              appliedtime={new Date(application?.applied_at).getHours()}
              skills={application?.seeker?.soft_skills}
              seeker_image={application?.seeker.profile_image}
              applicationId={application?.id}
              status={application.status}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentApplications;