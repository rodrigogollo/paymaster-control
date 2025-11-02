import { uuid, pgTable, varchar, timestamp, boolean, numeric } from "drizzle-orm/pg-core";
import { users } from "./user.schema.ts";
import { projects } from "./project.schema.ts";
import { relations } from "drizzle-orm";

export const timeEntities = pgTable('time_entity', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  projectId: uuid('project_id').references(() => projects.id).notNull(),
  date: timestamp('date').notNull(),
  duration: numeric('duration').notNull(),
  notes: varchar('notes', { length: 255 }),
  isBillable: boolean('is_billable').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const timeEntitiesrelations = relations(timeEntities, ({ one, many }) => ({
  user: many(users),
  project: one(projects, {
    fields: [timeEntities.projectId],
    references: [projects.id],
  }),
}))
