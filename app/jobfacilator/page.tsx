import { Clock } from "lucide-react";
import JobFacilatorNavbar from "./_components/JobFacilatorNavbar";
import { Button } from "@/components/ui/button";
import Information from "../jobseeker/components/Information";
import JobPostingCard from "./JobPostingCard";
import QuickActions from "./_components/QuickActions";
import RecentApplications from "./_components/RecentApplications";
import Footer from "../_components/Footer";
import VerificationPending from "./_components/VerificationPending";

const page = () => {
  return (
    <div className="min-h0screen font-playfair bg-[#F1F5F9]">
      <div className="flex-row gap-4 justify-center items-center lg:flex lg:gap-40">
        <h1 className="text-2xl font-bold ">JobFacilator Dashboard</h1>
        {/* verification pending  */}
        <VerificationPending />
        {/* close  */}
      </div>

      {/* Information wala section start  */}
      <div className="grid grid-cols-1 gap-4 p-6 w-full items-center justify-center md:grid-cols-2 md:gap-6 md:w-auto md:p-8 lg:grid-cols-4 lg:gap-8 lg:w-auto lg:p-10">
        <Information
          title="Active jobs"
          number={20}
          lastline="2 expiring soon"
        />
        <Information
          title="Total Applications"
          number={20}
          lastline="+20 this week "
        />
        <Information
          title="Pending Reviews"
          number={20}
          lastline="requires action"
        />
        <Information
          title="Profile Views"
          number={200}
          lastline="last 20 days"
        />
      </div>
      {/* next section start vayo  */}

      <div className="lg:flex lg:justify-center lg:gap-40 lg:p-10">
        <div className="max-w-[838px] bg-white rounded-2xl h-auto p-10">
          <p className="flex gap-4 justify-between font-bold text-2xl mb-2">
            Active Job Posting{" "}
            <span>
              <Button>View All</Button>
            </span>
          </p>
          <div className="flex flex-col gap-4 p-4">
            <JobPostingCard
              ApplicationNo={144}
              JobName="React Developer"
              Location="NewYork"
              JobType="Onsite"
              ReviewedNo={24}
              ShortlistedNo={14}
              ViewsNo={2222}
            />
            <JobPostingCard
              ApplicationNo={144}
              JobName="React Developer"
              Location="NewYork"
              JobType="Onsite"
              ReviewedNo={24}
              ShortlistedNo={14}
              ViewsNo={2222}
            />
            <JobPostingCard
              ApplicationNo={144}
              JobName="React Developer"
              Location="NewYork"
              JobType="Onsite"
              ReviewedNo={24}
              ShortlistedNo={14}
              ViewsNo={2222}
            />
            <JobPostingCard
              ApplicationNo={144}
              JobName="React Developer"
              Location="NewYork"
              JobType="Onsite"
              ReviewedNo={24}
              ShortlistedNo={14}
              ViewsNo={2222}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <QuickActions />
          {/* company profile starts */}

          <div className="w-full max-w-md mx-auto lg:max-w-none lg:mx-0 bg-white border border-black rounded-2xl p-6 shadow-sm ">
            <h1 className="text-lg font-bold mb-5 text-center">Company Profile</h1>
            <div className="flex flex-col justify-center items-center sm:flex-row sm:items-start gap-5">
              <img
                src="/Logo.jpg"
                alt="Company Logo"
                className="w-32 h-32  object-contain rounded-xl border border-gray-200 bg-gray-50 p-2"
              />
            </div >
            <div className="flex flex-col items-center text-center sm:text-left flex-1">
            <h1 >Company Name</h1>
            <p>Industry</p>
            <Button className="mt-4 w-full sm:w-auto">Edit Profile</Button>

            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mb-4">
        <div className="max-w-7xl mx-auto">
        <RecentApplications />

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
