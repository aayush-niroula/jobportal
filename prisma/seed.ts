import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles = ["job_seeker", "job_facilitator", "admin"];

  for (const role_name of roles) {
    await prisma.role.upsert({
      where: { role_name },
      update: {},
      create: { role_name },
    });
  }

  console.log("Roles seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
