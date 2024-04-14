import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
	id: serial("id").primaryKey(),
	name: text("task_name").notNull(),
	isChecked: boolean("is_checked").notNull().default(false),
});
