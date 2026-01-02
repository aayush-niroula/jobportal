
import {MongoClient} from 'mongodb'

const DATABASE_URL = "mongodb+srv://aayushniroula645:ayush@cluster0.ntj2h3i.mongodb.net/job-portal?retryWrites=true&w=majority&appName=Cluster0"

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

async function main() {
  const client = new MongoClient(DATABASE_URL);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(); // uses db from connection string
    const jobs = db.collection("Jobs");

    const fieldsToFix = [
      "description",
      "responsibilities",
      "requirements",
      "preferred_qualifications",
      "benefits",
      "skills",
    ];

    for (const field of fieldsToFix) {
      const result = await jobs.updateMany(
        { [field]: { $type: "string" } },
        [
          {
            $set: {
              [field]: {
                $cond: {
                  if: { $eq: [{ $type: `$${field}` }, "string"] },
                  then: [`$${field}`],
                  else: `$${field}`,
                },
              },
            },
          },
        ]
      );

      console.log(
        `🔧 Fixed ${result.modifiedCount} documents for field: ${field}`
      );
    }

    console.log("🎉 Jobs data normalized successfully");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

main();
