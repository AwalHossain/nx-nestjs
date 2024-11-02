
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';


// define role types
export const ROLE_TYPE = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
} as const;

export type RoleType = (typeof ROLE_TYPE)[keyof typeof ROLE_TYPE];


export const user_roles = pgTable('user_roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique().$type<RoleType>(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
