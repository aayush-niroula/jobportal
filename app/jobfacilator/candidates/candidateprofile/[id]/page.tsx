"use client";
import CandiateTop from "../_components/CandiateTop";
import ProfessionalSummary from "../_components/ProfessionalSummary";
import ContactInformation from "../_components/ContactInformation";
import Skills from "../_components/Skills";
import Availability from "../_components/Availability";
import WorkExperience from "../_components/WorkExperience";
import { Button } from "@/components/ui/button";
import Footer from "@/app/_components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Candidate } from "@/app/types/types";

const page = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCandidateWithId = async () => {
      const res = await fetch(`/api/jobseeker/${id}`);
      const data = await res.json();
      console.log(data);

      setCandidate(data);
    };
    fetchCandidateWithId();
  }, [id]);
  if (!candidate) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Loading candidate profile...</p>
    </div>
  );
}
  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <CandiateTop
          candidatename={candidate.user?.name ?? ""}
          expericence="5"
          location="San francisco"
          number={candidate.user?.phone}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfessionalSummary description={candidate.professional_summary ?? ""} />
          </div>
          <ContactInformation
            email={candidate?.user.email ?? ""}
            location={candidate?.location ?? ""}
            phone={candidate?.user.phone ?? ""}
          />
        </div>

        {/* ===== Skills + Availability ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skills
              technicalSkills={candidate.technical_skills}
              softSkills={candidate.soft_skills}
            />
          </div>

          <div className="flex flex-col gap-6">
            <Availability
              availability={candidate?.availability}
              expectedSalary={
                candidate?.expected_salary_min && candidate?.expected_salary_max
                  ? `Rs. ${candidate.expected_salary_min} - ${candidate.expected_salary_max}`
                  : "Negotiable"
              }
              workPreference={candidate?.work_mode}
              jobType={candidate?.job_type}
            />

            {/* Resume Download */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 font-playfair text-center">
              <h1 className="text-lg sm:text-xl font-bold mb-4">
                Resume Download
              </h1>
              <Button className="w-full py-6">Download Resume</Button>
            </div>
          </div>
        </div>

        {/* ===== Experience + Education ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WorkExperience
            experiences={(candidate.experiences ?? []).map(exp => ({
              ...exp,
              period: `${exp.start_date} – ${exp.end_date}`
            }))}
            />
          </div>

          {/* Education */}
          <div className="bg-white p-6 rounded-2xl font-playfair space-y-4">
            <h1 className="text-xl font-bold">Education</h1>

            {candidate.educations?.map((edu, i) => (
              <div key={i} className="border border-gray-200 p-4 rounded-xl">
                <h2 className="font-medium">{edu.degree}</h2>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.start_year} – {edu.end_year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;
