
const Skills = () => {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
  ];

  const softSkills = [
    "Team Leadership",
    "Project Management",
    "Communication",
    "Problem Solving",
  ];

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
      <p className="text-base sm:text-lg font-medium mb-3">
        Technical Skills
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill, index) => (
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
        ))}
      </div>
      <p className="text-base sm:text-lg font-medium mb-3">
        Soft Skills
      </p>

      <div className="flex flex-wrap gap-3">
        {softSkills.map((skill, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default Skills;
