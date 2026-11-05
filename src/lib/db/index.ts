import "server-only";

import { mkdir } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";
import { PGlite } from "@electric-sql/pglite";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import * as schema from "@/lib/db/schema";
import type { AppDb } from "@/lib/db/types";

export type { AppDb };

let dbPromise: Promise<AppDb> | undefined;

export function getDb(): Promise<AppDb> {
  if (!dbPromise) {
    dbPromise = openDb();
  }
  return dbPromise;
}

async function openDb(): Promise<AppDb> {
  const url = process.env.DATABASE_URL?.trim();
  if (url) {
    return drizzleNeon(neon(url), { schema });
  }
  if (process.env.VERCEL) {
    throw new Error("DATABASE_URL is required in production.");
  }
  const dataDir = process.env.PGLITE_DATA_DIR?.trim() || "./data/amani";
  await mkdir(dataDir, { recursive: true });
  const client = new PGlite(dataDir);
  await client.waitReady;
  return drizzlePglite(client, { schema });
}
