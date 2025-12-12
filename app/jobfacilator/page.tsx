import { Clock } from "lucide-react"
import JobFacilatorNavbar from "./_components/JobFacilatorNavbar"
import { Button } from "@/components/ui/button"
import Information from "../jobseeker/components/Information"
import JobPostingCard from "./JobPostingCard"
import QuickActions from "./_components/QuickActions"
import RecentApplications from "./_components/RecentApplications"
import Footer from "../_components/Footer"
import VerificationPending from "./_components/VerificationPending"

const page = () => {
  return (
    <div className="font-playfair bg-[#F1F5F9]">
        <div className="flex justify-center items-center gap-40 mt-8">
        <h1 className="text-2xl font-bold">JobFacilator Dashboard</h1>
        {/* verification pending  */}
       <VerificationPending/>
        {/* close  */}
        </div>

        {/* Information wala section start  */}
        <div className="grid grid-cols-4 gap-8 p-15">
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

        <div className="flex justify-center gap-40 p-10">
            <div className="max-w-[838px] bg-white rounded-2xl h-auto p-10">
                <p className="flex gap-4 justify-between font-bold text-2xl mb-2">Active Job Posting <span><Button>View All</Button></span></p>
                <div className="flex flex-col gap-4">
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
                <QuickActions/>
                {/* company profile starts */}

                <div className="max-w-[593px] h-auto p-6 bg-white border border-black rounded-2xl flex flex-col gap-2 ">
                    <h1>Company Profile</h1>
                    <img src="/Logo.jpg" alt="" className="object-contain min-w-50 max-h-50"/>
                    <h1>Company Name</h1>
                    <p>Industry</p>
                    <Button>Edit Profile</Button>

                </div>

            </div>

        </div>

        <div className="flex flex-col justify-center items-center mb-4">
           <RecentApplications/>
        </div>
        <Footer/>

    </div>
  )
}

export default page