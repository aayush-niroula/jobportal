import { Circle } from "lucide-react";
import React from "react";

const experiences = [
  {
    role: "Senior Software Developer",
    company: "Tech Corp Inc",
    period: "2022 – 2024",
    points: [
      "Led development of key features for enterprise web applications",
      "Collaborated with cross-functional teams to deliver projects on time",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipelines and improved deployment processes",
    ],
  },
  {
    role: "Senior Software Developer",
    company: "Tech Corp Inc",
    period: "2020 – 2022",
    points: [
      "Designed scalable backend services",
      "Improved application performance by 30%",
      "Worked closely with product managers",
      "Maintained deployment pipelines",
    ],
  },
];

const WorkExperience = () => {
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
                  <Circle size={14} className="mt-1 shrink-0" />
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
