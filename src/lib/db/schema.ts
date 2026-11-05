import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(),
  createdAt: text("created_at").notNull(),
});

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  style: text("style").notNull(),
  price: integer("price").notNull(),
  material: text("material").notNull(),
  description: text("description").notNull(),
  pieces: text("pieces").notNull(),
  image: text("image").notNull(),
  shot: text("shot"),
  featured: boolean("featured").notNull().default(false),
  audience: text("audience"),
  soldOutOverride: boolean("sold_out_override").notNull().default(false),
  stock: integer("stock").notNull().default(0),
  weightGrams: integer("weight_grams"),
  cost: integer("cost"),
  notes: text("notes"),
  gradientFrom: text("gradient_from"),
  gradientTo: text("gradient_to"),
  updatedAt: text("updated_at").notNull(),
  updatedByEmail: text("updated_by_email"),
});
