"use client";
import Footer from "@/app/_components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bookmark,
  Building,
  Circle,
  MapPin,
  Share2,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ApplyForm from "./Applyform";

const ApplyNow = () => {
  const router = useRouter();
 

  return (
    <div className="bg-[#F1F5F9] font-playfair px-4 sm:px-6 lg:px-10 py-10 space-y-10 font-playfair">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-center">
        {/* Left Column */}
        <div className="flex flex-col gap-6 w-full lg:w-2/3">
          {/* Job Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <img
              src="/Logo.jpg"
              alt="Company Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-lg"
            />
            <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
              <h1 className="text-lg sm:text-xl font-semibold">Job Title</h1>
              <p className="text-gray-600">Lenevo</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-gray-500">
                <span>USA, Los Angeles</span>
                <span>Full-time</span>
                <span>Posted 3 days ago</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 text-gray-600">
                <Bookmark className="w-5 h-5" />
                <Share2 className="w-5 h-5" />
              </div>
              <ApplyForm/>
            </div>
          </div>

          {/* Salary & Benefits */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Salary & Benefits
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 border border-gray-300 rounded-xl p-3">
                <p className="text-gray-500">Salary Range</p>
                <h1 className="font-semibold">$80,000 - $120,000</h1>
                <p className="text-gray-500">per year</p>
              </div>
              <div className="flex-1 border border-gray-300 rounded-xl p-3">
                <p className="text-gray-500">Application Deadline</p>
                <h1 className="font-semibold">Dec 20, 2025</h1>
                <p className="text-gray-500">23 days remaining</p>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold mt-4">
              Benefits Package
            </h1>
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
              {[
                "Health Insurance",
                "Bonus",
                "Lunch & Breakfast",
                "Flexible Hours",
                "Remote Option",
              ].map((item, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: About Company */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 items-center text-center">
            <h1 className="text-xl sm:text-2xl font-semibold">
              About the Company
            </h1>
            <img
              src="/Logo.jpg"
              alt="Company Logo"
              className="h-40 w-auto object-contain"
            />
            <h2 className="text-lg sm:text-xl font-light">
              Lenevo Group Limited
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quae
              est vel sint sunt non modi veritatis perferendis ipsa.
            </p>
          </div>

          {/* Company Details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5" />
              <div>
                <p className="text-gray-500">Industry</p>
                <h1 className="font-semibold">Hardware</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5" />
              <div>
                <p className="text-gray-500">Employees</p>
                <h1 className="font-semibold">500+</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div>
                <p className="text-gray-500">Location</p>
                <h1 className="font-semibold">USA, Los Angeles</h1>
              </div>
            </div>

            <Button
              className="mt-4 py-2 px-4 sm:py-3 sm:px-6"
              onClick={() => router.push("/jobseeker/viewcompany")}
            >
              Company Profile <ArrowRight className="ml-2 w-4 h-4 inline" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Job Description */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-6">
        <section className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-semibold">Job Description</h1>
          <p>
            [Company Name] is looking for a talented and motivated [Job Title]
            to join our growing team...
          </p>
        </section>

        <section className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Key Responsibilities
          </h1>
          {[
            "Design, develop, and maintain software applications",
            "Collaborate with teams",
            "Ensure code quality",
            "Participate in reviews",
          ].map((item, i) => (
            <p key={i} className="flex items-start gap-2">
              <Circle className="w-3 h-3 mt-1" /> {item}
            </p>
          ))}
        </section>

        <section className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Required Qualifications
          </h1>
          {[
            "Bachelor's degree in CS",
            "3+ years experience",
            "Strong communication skills",
            "Team player",
          ].map((item, i) => (
            <p key={i} className="flex items-start gap-2">
              <Circle className="w-3 h-3 mt-1" /> {item}
            </p>
          ))}
        </section>

        <section className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Preferred Qualifications
          </h1>
          {[
            "Master's degree in CS",
            "Leadership experience",
            "Open-source contributions",
          ].map((item, i) => (
            <p key={i} className="flex items-start gap-2">
              <Circle className="w-3 h-3 mt-1" /> {item}
            </p>
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ApplyNow;
