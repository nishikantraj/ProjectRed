import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// Create a standard PostgreSQL connection pool
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// Create the Prisma adapter using that pool
const adapter = new PrismaPg(pool);

// Pass the adapter to the PrismaClient constructor
export const prisma = new PrismaClient({ adapter });