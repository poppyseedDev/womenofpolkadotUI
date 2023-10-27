declare global {
  /* eslint-disable no-var */
  var prisma: PrismaClient | undefined // This must be a `var` and not a `let / const`
  /* eslint-enable no-var */

}

import { PrismaClient } from "@prisma/client";
let prisma: PrismaClient;

const client = (globalThis as any).prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = client;

export default client;
