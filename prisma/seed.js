import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Setting all jobs to is_expired = false...");

  const result = await prisma.jobs.updateMany({
    where: {},
    data: { is_expired: false },
  });

  console.log(`✅ Updated ${result.count} jobs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
