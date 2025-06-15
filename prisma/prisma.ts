import { PrismaClient } from '../app/generated/prisma';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import 'dotenv/config';

declare global {
  var prismaClient: PrismaClient;
}

const adapter = new PrismaLibSQL({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

// avoid multiple instances when hot-reloading
globalThis.prismaClient ??= new PrismaClient({ adapter });

const prisma = globalThis.prismaClient;

export default prisma;
