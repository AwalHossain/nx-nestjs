import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { user_roles } from './roles.schema';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique(),
  phone: varchar('phone', { length: 11 }).unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role_id: uuid('role_id').notNull().references(()=> user_roles.id),
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
