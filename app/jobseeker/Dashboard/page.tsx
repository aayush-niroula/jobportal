import React from "react";
import Information from "../components/Information";
import ApplyCard from "../components/ApplyCard";
import ProfileCompleteness from "../components/ProfileCompleteness";
import Notifications from "../components/Notifications";
import { Button } from "@/components/ui/button";
import RecentApplication from "../components/RecentApplication";
import Footer from "@/app/_components/Footer";

const page = () => {
  return (
    <div className="p-15">
      <h1 className="text-4xl font-medium">Welcome back ,[User Name] !</h1>
      <p className="text-sm font-light p-4">
        Here’s what happeing with your job search
      </p>
      <div className="grid grid-cols-3 gap-8">
        <Information title="Application" number={20} lastline="+2 this week" />
        <Information title="In Review" number={20} lastline="pending review" />
        <Information title="Saved Jobs" number={8} lastline="bookmarked" />
        <div className="flex justify-between gap-80 ">
            <div className="flex flex-col gap-6">
            {/* left side */}
            <ApplyCard/>
            <ApplyCard/>
            <ApplyCard/>
           
            </div>
     {/* right side profile completeness wala section  */}
            <div className="flex flex-col gap-8">
                <ProfileCompleteness/>
                <Notifications/>
                <div className="p-8 border border-black rounded-2xl flex flex-col gap-4 ">
                   <h1 className="text-2xl font-bold">AI resume Analysis</h1>
                   <p className="text-md font-extralight">Upload your resume and get instant job recommendations powered by AI</p> 
                   <Button className="p-4">Start Analyzing</Button>
                </div>

            </div>
        </div>
        
      </div>
        <Button className="p-6">View All</Button>

        <div className="flex pr-6 justify-between items-center mt-4">
            <h1 className="text-4xl font-medium font-playfair ">Recent Applications</h1>
            <Button>View All</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2 mb-10">
        <RecentApplication/>
        <RecentApplication/>
        <RecentApplication/>
        <RecentApplication/>

        </div>
        <Footer/>
    </div>
  );
};

export default page;
