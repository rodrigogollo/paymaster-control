import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer
} from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }),
  age: integer(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export const insertUserSchema = createInsertSchema(users)
insertUserSchema.extend({
  email: z.email({ message: 'Invalid email address' })
})

export const selectUserSchema = createSelectSchema(users)
