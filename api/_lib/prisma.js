import { PrismaClient } from "../../src/generated/prisma";

const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}

export default globalForPrisma.prisma;
