import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding default views...");

  const facilitatorResult = await prisma.jobFacilitator.updateMany({
    data: { profile_views: 0 },
  });
  console.log(`Updated ${facilitatorResult.count} facilitators`);


  const jobResult = await prisma.jobs.updateMany({
    data: { views: 0 },
  });
  console.log(`Updated ${jobResult.count} jobs`);

  console.log("Seeding complete ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
