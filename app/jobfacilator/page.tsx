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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase } from "lucide-react";

const page = () => {
  const router = useRouter()
  const user = useAuthStore(state=>state.user)
  const [jobsDetails,setJobDetails] =useState<any[]>([])
  const [profileViews, setProfileViews] = useState(0);
  console.log(jobsDetails);
  

useEffect(() => {
  const fetchProfileViews = async () => {
    const res = await fetch("/api/jobfacilator/profile-views", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    const data = await res.json();
    setProfileViews(data.profileViews ?? 0);
  };

  if (user?.token) fetchProfileViews();
}, [user?.token]);


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
          <Information title="Active Jobs" number={jobsDetails?.length || 0}  />
          <Information title="Total Applications" number={totalApplications}  />
          <Information title="Pending Reviews" number={totalPending}  />
          <Information title="Profile Views" number={profileViews}  />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="pb-4 border-b-2 border-black">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="h-5 w-5 text-black" />
                  Active Job Postings
                </CardTitle>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => router.push('/jobfacilator/jobs')}
                  className="gap-1 border-black hover:bg-black hover:text-white"
                >
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-6">
              {jobsDetails?.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300">
                  <Briefcase className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-1 text-black">No active job postings</p>
                  <p className="text-sm mb-4 text-gray-600">Create your first job posting to get started</p>
                  <Button 
                    onClick={() => router.push('/jobfacilator/create-job')}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    Create Job Posting
                  </Button>
                </div>
              ) : (
                jobsDetails?.map((job, i) => (
                  <JobPostingCard
                    key={i}
                    ApplicationNo={job.totalApplications}
                    JobName={job.jobName}
                    Location={job.location}
                    JobType={job.workmode}
                    ReviewedNo={job?.statusCounts?.SCREENING}
                    ShortlistedNo={job?.statusCounts?.INTERVIEW}
                    ViewsNo={job.views}
                  />
                ))
              )}
            </CardContent>
          </Card>

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
