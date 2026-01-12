"use client"
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import RecentApplicationCard from "./RecentApplicationCard";
import { useAuthStore } from "@/app/store/useAuthStore";


const RecentApplications = () => {
  const user = useAuthStore(state =>state.user)
  const [recentapplication,setRecentApplications] = useState<any[]>([])
console.log(recentapplication);



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
    <div className="w-full bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1>Recent Applications</h1>
        <Button className="w-fit lg:w-auto md:w-auto">View All</Button>
      </div>
 <div className="flex flex-col gap-4">
       {recentapplication?.map((application, i) => (
  <RecentApplicationCard
    key={i}
    id={application?.seeker?.id}
    name={application?.seeker?.user?.name}  
    appliedfor={application?.job?.job_name}
    appliedtime={new Date(application?.applied_at).getHours()}
    skills = {application?.seeker?.soft_skills}
    seeker_image={application?.seeker.profile_image}
    applicationId={application?.id}
    status ={application.status}
  />
))}

      </div>
      
    </div>
  );
};

export default RecentApplications;
