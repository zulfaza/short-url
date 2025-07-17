import { pgTable, time, varchar, index } from 'drizzle-orm/pg-core';

export const urlTable = pgTable(
  'url',
  {
    hash: varchar({ length: 255 }).notNull().unique().primaryKey(),
    longUrl: varchar({
      length: 255,
    }).notNull(),
    createdAt: time().defaultNow(),
  },
  (table) => [index('url_hash_index').on(table.hash)]
);
