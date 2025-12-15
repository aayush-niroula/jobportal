"use client"
import { Button } from "@/components/ui/button";
import Information from "../jobseeker/components/Information";
import JobPostingCard from "./JobPostingCard";
import QuickActions from "./_components/QuickActions";
import RecentApplications from "./_components/RecentApplications";
import Footer from "../_components/Footer";
import VerificationPending from "./_components/VerificationPending";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter()
  return (
    <div className="min-h-screen font-playfair bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Job Facilitator Dashboard</h1>
          <VerificationPending />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Information title="Active Jobs" number={20} lastline="2 expiring soon" />
          <Information title="Total Applications" number={20} lastline="+20 this week" />
          <Information title="Pending Reviews" number={20} lastline="Requires action" />
          <Information title="Profile Views" number={200} lastline="Last 20 days" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Active Job Postings</h2>
              <Button size="sm">View All</Button>
            </div>

            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <JobPostingCard
                  key={i}
                  ApplicationNo={144}
                  JobName="React Developer"
                  Location="New York"
                  JobType="Onsite"
                  ReviewedNo={24}
                  ShortlistedNo={14}
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
