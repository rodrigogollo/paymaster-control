import { pgTable, varchar, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { projects } from "./project.schema.ts";
import { relations } from "drizzle-orm";

export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  primaryContactName: varchar('primary_contact_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  industry: varchar('industry', { length: 255 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const clientsRelations = relations(clients, ({ many }) => ({
  project: many(projects)
}))

export type NewClient = typeof clients.$inferInsert
