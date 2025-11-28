import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  await prisma.tasks.deleteMany();
  console.log("✓ Cleared existing tasks");

  // Seed tasks
  const tasks = await prisma.tasks.createMany({
    data: [
      {
        caseNumber: uuid(),
        title: "Review Employment Tribunal Case",
        description:
          "Review case documents for upcoming employment tribunal hearing",
        status: "PENDING",
        createdDate: new Date("2025-11-20T09:00:00Z"),
      },
      {
        caseNumber: uuid(),
        title: "Prepare Court Bundle",
        description:
          "Compile and organize all documents for court bundle submission",
        status: "INPROGRESS",
        createdDate: new Date("2025-11-22T10:30:00Z"),
      },
      {
        caseNumber: uuid(),
        title: "Client Meeting - Divorce Proceedings",
        description: "Initial consultation with client regarding divorce case",
        status: "COMPLETED",
        createdDate: new Date("2025-11-15T14:00:00Z"),
      },
      {
        caseNumber: uuid(),
        title: "File Appeal Notice",
        description: "Submit appeal notice to Court of Appeal within deadline",
        status: "PENDING",
        createdDate: new Date("2025-11-25T11:00:00Z"),
      },
      {
        caseNumber: uuid(),
        title: "Update Case Management System",
        description:
          "Update all case records in the management system with latest information",
        status: "INPROGRESS",
        createdDate: new Date("2025-11-23T16:00:00Z"),
      },
      {
        caseNumber: uuid(),
        title: "Witness Statement Review",
        description: "Review and verify witness statements for accuracy",
        status: "PENDING",
        createdDate: new Date("2025-11-26T09:30:00Z"),
      },
      {
        caseNumber: uuid(),
        title: "Court Hearing Attendance",
        description: "Attend preliminary hearing at Royal Courts of Justice",
        status: "CANCELLED",
        createdDate: new Date("2025-11-18T08:00:00Z"),
      },
      {
        caseNumber: uuid(),
        title: "Legal Research - Precedent Cases",
        description: "Research relevant precedent cases for ongoing litigation",
        status: "INPROGRESS",
        createdDate: new Date("2025-11-24T13:00:00Z"),
      },
    ],
  });

  console.log(`✓ Created ${tasks.count} tasks`);
  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
