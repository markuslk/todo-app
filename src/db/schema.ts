import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tasks = pgTable("tasks", {
	id: serial("id").primaryKey(),
	name: text("task_name").notNull(),
	isChecked: boolean("is_checked").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	userId: integer("user_id")
		.references(() => users.id)
		.notNull(),
});

export const taskRelations = relations(tasks, ({ one }) => ({
	user: one(users, { fields: [tasks.userId], references: [users.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
	tasks: many(tasks),
}));
