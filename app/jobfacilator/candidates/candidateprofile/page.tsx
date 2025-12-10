import React from "react";
import CandiateTop from "./_components/CandiateTop";
import ProfessionalSummary from "./_components/ProfessionalSummary";
import ContactInformation from "./_components/ContactInformation";
import Skills from "./_components/Skills";
import Availability from "./_components/Availability";
import { Button } from "@/components/ui/button";
import WorkExperience from "./_components/WorkExperience";

const page = () => {
  return (
    <div className="bg-[#F1F5F9] flex flex-col justify-center p-10 gap-8">
        <div className="flex justify-center">
      <CandiateTop />
        </div>
      <div className="flex justify-center gap-40">
        <ProfessionalSummary  description="Experienced software developer with 5+ years of expertise in building scalable web applications and leading development teams. Specialized in full-stack JavaScript development with React, Node.js, and cloud technologies. Proven track record of delivering high-quality solutions in fast-paced environments. Strong problem-solving skills and excellent communication abilities. Passionate about clean code, best practices, and mentoring junior developers." />
        <ContactInformation
        email="ayush@gmail.com"
        location="NewYork,USA"
        phone={98232040403}
        />
      </div>
      <div className="flex gap-40 justify-center">
        <Skills/>
        <div className="flex flex-col gap-4">
            <Availability/>
             {/* resume download ko button ko div  */}
             <div className="border border-black rounded-2xl font-playfair flex flex-col justify-center items-center gap-4 p-4">
                <h1 className="text-2xl font-bold">Resume Downoad</h1>
                <Button className="p-6">Download</Button>
             </div>

        </div>
      </div>

      <div className="flex justify-center gap-40">
        <div>
           <h1 className="text-4xl font-bold font-playfair">Work Experience</h1>
            <WorkExperience/>
        </div>
        <div>
            Education
        </div>
      </div>
    </div>
  );
};

export default page;
