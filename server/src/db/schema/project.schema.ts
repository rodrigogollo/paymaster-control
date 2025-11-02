import { numeric, uuid, pgTable, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { clients } from "./client.schema.ts";
import { relations } from "drizzle-orm";

export const STATUS_VALUES = ['active', 'on_hold', 'completed'] as const;
export const statusEnum = pgEnum('status', STATUS_VALUES);
export const BILLING_TYPE_VALUES = ['Time & Materials', 'Fixed Price', 'Subscription'] as const;
export const billingTypeEnum = pgEnum('billing_type', BILLING_TYPE_VALUES)

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  clientId: uuid('client_id').references(() => clients.id).notNull(),
  billingType: billingTypeEnum('billing_type').default('Time & Materials').notNull(),
  budgetTotal: numeric('budget_total', { precision: 12, scale: 2 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  status: statusEnum().default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const projectsRelations = relations(projects, ({ one }) => ({
  client: one(clients)
}))

export type NewProject = typeof projects.$inferInsert;
