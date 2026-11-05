import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { PgliteDatabase } from "drizzle-orm/pglite";
import type * as schema from "@/lib/db/schema";

export type AppDb =
  | PgliteDatabase<typeof schema>
  | NeonHttpDatabase<typeof schema>;
