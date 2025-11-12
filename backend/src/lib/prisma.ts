import { PrismaClient } from "../../app/generated/prisma"; // Updated path

// Avoid multiple instances in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
};

// Use existing client or create a new one
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Assign to global in dev to prevent multiple instances
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
