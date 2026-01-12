"use client"
import { Button } from "@/components/ui/button";
import Information from "../jobseeker/components/Information";
import JobPostingCard from "./JobPostingCard";
import QuickActions from "./_components/QuickActions";
import RecentApplications from "./_components/RecentApplications";
import Footer from "../_components/Footer";
import VerificationPending from "./_components/VerificationPending";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const page = () => {
  const router = useRouter()
  const user = useAuthStore(state=>state.user)
  const [jobsDetails,setJobDetails] =useState<any[]>([])

  useEffect(()=>{
   const fetchApplicationDetails = async()=>{
    const res = await fetch(`/api/jobfacilator/jobapplications`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${user?.token}`,
        "Content-Type":"application/json"
      }
    })

    const data = await res.json()
    console.log(data.jobs);
    setJobDetails(data.jobs)
    
   }
   fetchApplicationDetails()
  },[user?.token])

    const totalApplications = jobsDetails?.reduce(
    (sum, job) => sum + (job.totalApplications || 0),
    0
  );

  const totalPending = jobsDetails?.reduce(
    (sum, job) => sum + (job.statusCounts?.PENDING || 0),
    0
  );
  return (
    <div className="min-h-screen font-playfair bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Job Facilitator Dashboard</h1>
          <VerificationPending />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Information title="Active Jobs" number={jobsDetails?.length || 0} lastline="2 expiring soon" />
          <Information title="Total Applications" number={totalApplications} lastline="+20 this week" />
          <Information title="Pending Reviews" number={totalPending} lastline="Requires action" />
          <Information title="Profile Views" number={200} lastline="Last 20 days" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Active Job Postings</h2>
              <Button size="sm">View All</Button>
            </div>

            <div className="flex flex-col gap-4">
              {jobsDetails?.map((job, i) => (
                <JobPostingCard
                  key={i}

                  ApplicationNo={job.totalApplications}
                  JobName={job.jobName}
                  Location={job.location}
                  JobType={job.workmode}
                  ReviewedNo={job?.statusCounts?.SCREENING}
                  ShortlistedNo={job?.statusCounts?.INTERVIEW}
                  ViewsNo={2222}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <QuickActions />


            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-5 text-center">
                Company Profile
              </h3>

              <div className="flex flex-col items-center gap-4">
                <img
                  src="/Logo.jpg"
                  alt="Company Logo"
                  className="w-28 h-28 object-contain rounded-xl border bg-gray-50 p-2"
                />

                <div className="text-center">
                  <h4 className="font-semibold">Company Name</h4>
                  <p className="text-sm text-gray-500">Industry</p>
                </div>

                <Button onClick={()=>router.push('/jobfacilator/editprofile')} className="w-full">Edit Profile</Button>
              </div>
            </div>
          </div>
        </div>

        <RecentApplications />
      </div>

      <Footer />
    </div>
  );
};

export default page;
