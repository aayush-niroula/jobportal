interface SkillsProps {
  technicalSkills?: string[];
  softSkills?: string[];
}

const Skills = ({
  technicalSkills = [],
  softSkills = [],
}: SkillsProps) => {
  return (
    <div
      className="
        w-full
        bg-white
        border border-gray-200
        rounded-2xl
        font-playfair
        p-4 sm:p-6 lg:p-8
        max-w-[763px]
      "
    >
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Skills & Technology
      </h1>

      {/* ===== Technical Skills ===== */}
      <p className="text-base sm:text-lg font-medium mb-3">
        Technical Skills
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {technicalSkills.length > 0 ? (
          technicalSkills.map((skill, index) => (
            <span
              key={index}
              className="
                px-3 py-1
                text-sm sm:text-base
                border border-gray-300
                rounded-full
                whitespace-nowrap
              "
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-gray-500">No technical skills added</p>
        )}
      </div>

      {/* ===== Soft Skills ===== */}
      <p className="text-base sm:text-lg font-medium mb-3">
        Soft Skills
      </p>

      <div className="flex flex-wrap gap-3">
        {softSkills.length > 0 ? (
          softSkills.map((skill, index) => (
            <span
              key={index}
              className="
                px-3 py-1
                text-sm sm:text-base
                rounded-full
                bg-green-100
                text-green-800
                whitespace-nowrap
              "
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-gray-500">No soft skills added</p>
        )}
      </div>
    </div>
  );
};

export default Skills;
