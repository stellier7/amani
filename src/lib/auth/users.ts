import { eq } from "drizzle-orm";
import type { Role } from "@/lib/admin/types";
import { hashPassword } from "@/lib/auth/password";
import { users } from "@/lib/db/schema";
import type { AppDb } from "@/lib/db/types";

export type UserRecord = {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
  createdAt: string;
};

export class DuplicateUserEmailError extends Error {
  constructor(email: string) {
    super(`Ya existe una cuenta con ${email}.`);
    this.name = "DuplicateUserEmailError";
  }
}

function asRole(value: string): Role {
  if (value === "admin" || value === "staff") return value;
  throw new Error(`Unhandled role: ${value}`);
}

function rowToUser(row: typeof users.$inferSelect): UserRecord {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: asRole(row.role),
    passwordHash: row.passwordHash,
    createdAt: row.createdAt,
  };
}

export async function findUserByEmail(
  db: AppDb,
  email: string,
): Promise<UserRecord | undefined> {
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.email, email.trim().toLowerCase()))
    .limit(1);
  const row = rows[0];
  return row ? rowToUser(row) : undefined;
}

export async function listUsers(db: AppDb): Promise<Omit<UserRecord, "passwordHash">[]> {
  const rows = await db.select().from(users);
  return rows
    .map(rowToUser)
    .sort((a, b) => a.name.localeCompare(b.name, "es"))
    .map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    }));
}

export async function createUser(
  db: AppDb,
  input: { email: string; name: string; password: string; role: Role },
): Promise<Omit<UserRecord, "passwordHash">> {
  const email = input.email.trim().toLowerCase();
  const existing = await findUserByEmail(db, email);
  if (existing) {
    throw new DuplicateUserEmailError(email);
  }
  const record: UserRecord = {
    id: crypto.randomUUID(),
    email,
    name: input.name.trim(),
    role: input.role,
    passwordHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };
  await db.insert(users).values(record);
  return {
    id: record.id,
    email: record.email,
    name: record.name,
    role: record.role,
    createdAt: record.createdAt,
  };
}
