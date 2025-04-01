import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// to Keep database connection alive
setInterval(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`; 
    console.log("✅ Database connection is alive");
  } catch (error) {
    console.error("❌ Database keep-alive failed:", error);
  }
}, 300000); // Runs every 5 minutes

