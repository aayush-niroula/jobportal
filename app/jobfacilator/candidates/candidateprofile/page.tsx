import CandiateTop from "./_components/CandiateTop";
import ProfessionalSummary from "./_components/ProfessionalSummary";
import ContactInformation from "./_components/ContactInformation";
import Skills from "./_components/Skills";
import Availability from "./_components/Availability";
import WorkExperience from "./_components/WorkExperience";
import { Button } from "@/components/ui/button";
import Footer from "@/app/_components/Footer";

const page = () => {
  return (
    <div className="bg-[#F1F5F9] min-h-screen">
     
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

     
        <CandiateTop />

     
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfessionalSummary
              description="Experienced software developer with 5+ years of expertise in building scalable web applications and leading development teams..."
            />
          </div>
          <ContactInformation
            email="ayush@gmail.com"
            location="New York, USA"
            phone={98232040403}
          />
        </div>

        {/* ===== Skills + Availability ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skills />
          </div>

          <div className="flex flex-col gap-6">
            <Availability />

            {/* Resume Download */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 font-playfair text-center">
              <h1 className="text-lg sm:text-xl font-bold mb-4">
                Resume Download
              </h1>
              <Button className="w-full py-6">
                Download Resume
              </Button>
            </div>
          </div>
        </div>

        {/* ===== Experience + Education ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WorkExperience />
          </div>

          {/* Education */}
          <div className="bg-white p-6 rounded-2xl font-playfair space-y-4">
            <h1 className="text-xl font-bold">Education</h1>

            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 p-4 rounded-xl"
              >
                <h2 className="font-medium">BSc CSIT</h2>
                <p className="text-sm text-gray-600">
                  Tribhuvan University
                </p>
                <p className="text-sm text-gray-500">
                  2021 – 2025
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
