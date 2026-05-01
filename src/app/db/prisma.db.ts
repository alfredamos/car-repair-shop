// lib/prisma.ts
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  // Use specific connection details if you prefer, or the URL
  url: process.env.DATABASE_URL,
});



const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter
        //log: ['query'], // Optional: log database queries
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


// import { PrismaClient } from "@prisma/client";
//
//
// const prismaClientSingleton = () => {
//     return new PrismaClient();
// };
//
// declare const globalThis: {
//     prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;
//
// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
//
// export default prisma;
//
// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
//
