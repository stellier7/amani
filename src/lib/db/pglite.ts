import { PGlite } from "@electric-sql/pglite";
import { drizzle, type PgliteDatabase } from "drizzle-orm/pglite";
import * as schema from "@/lib/db/schema";

export type PgliteDb = PgliteDatabase<typeof schema>;

export function createPgliteDb(dataDir?: string): PgliteDb {
  const client = dataDir ? new PGlite(dataDir) : new PGlite();
  return drizzle(client, { schema });
}
