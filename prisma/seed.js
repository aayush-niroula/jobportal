import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding candidate data...");

  // 1️⃣ Create Role (JOB_SEEKER)
  const seekerRole = await prisma.role.upsert({
    where: { role_name: "JOB_SEEKER" },
    update: {},
    create: {
      role_name: "JOB_SEEKER",
    },
  });

  // 2️⃣ Create User
  const user = await prisma.user.create({
    data: {
      name: "Alex Johnson",
      email: "alex@gmail.com",
      phone: "9800000000",
      role_id: seekerRole.id,
    },
  });

  // 3️⃣ Create Job Seeker Profile
  const jobSeeker = await prisma.jobSeeker.create({
    data: {
      user_id: user.id,
      role_id: seekerRole.id,
      location: "San Francisco",
      experience_level: "MID",
      professional_summary:
        "Full-stack developer with 5+ years of experience building scalable web applications.",
      technical_skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
      ],
      soft_skills: [
        "Communication",
        "Teamwork",
        "Problem Solving",
      ],
      availability: "Immediate",
      expected_salary_min: 80000,
      expected_salary_max: 120000,
      job_type: "FULL_TIME",
      work_mode: "REMOTE",
      resume_url: "https://example.com/resume.pdf",
      linkedin_url: "https://linkedin.com/in/alex",
      portfolio_url: "https://alex.dev",
    },
  });

  // 4️⃣ Education
  await prisma.education.createMany({
    data: [
      {
        jobseeker_id: jobSeeker.id,
        degree: "BSc CSIT",
        institution: "Tribhuvan University",
        start_year: 2021,
        end_year: 2025,
      },
    ],
  });

  // 5️⃣ Work Experience
  await prisma.workExperience.createMany({
    data: [
      {
        jobseeker_id: jobSeeker.id,
        role: "Full Stack Developer",
        company: "LeapFrog",
        start_date: new Date("2022-01-01"),
        end_date: null,
        points: [
          "Built scalable web applications using Next.js",
          "Worked with Prisma and MongoDB",
          "Collaborated with designers and product managers",
        ],
      },
    ],
  });

  console.log("✅ Candidate seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
