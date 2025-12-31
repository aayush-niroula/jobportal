import { Circle } from "lucide-react";
import React from "react";

export interface WorkExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
}

interface WorkExperienceProps {
  experiences: WorkExperienceItem[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({
  experiences,
}) => {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 font-playfair">
        <h1 className="text-xl font-bold mb-4">
          Work Experience
        </h1>
        <p className="text-gray-500 text-sm">
          No work experience available.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 font-playfair">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">
        Work Experience
      </h1>

      <div className="flex flex-col gap-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-[#FAF2F2] rounded-xl p-4 sm:p-5"
          >
            <div className="mb-3">
              <h2 className="text-lg sm:text-xl font-bold">
                {exp.role}
              </h2>
              <p className="text-sm sm:text-base font-medium">
                {exp.company}
              </p>
              <p className="text-sm text-gray-600">
                {exp.period}
              </p>
            </div>

            <ul className="space-y-2">
              {exp.points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm sm:text-base"
                >
                  <Circle
                    size={14}
                    className="mt-1 shrink-0"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
