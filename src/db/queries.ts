"use server";
import { asc, desc, eq, not } from "drizzle-orm";
import db from "./drizzle";
import { tasks } from "./schema";
import { revalidatePath } from "next/cache";

export const getAllTasks = async () => {
	const data = await db.query.tasks.findMany({
		orderBy: [desc(tasks.id)],
	});
	return data;
};

export const getTask = async (taskId: number) => {
	const data = await db.query.tasks.findFirst({
		where: (tasks, { eq }) => eq(tasks.id, taskId),
	});

	return data;
};
export const createTask = async (taskName: string) => {
	await db.insert(tasks).values({ name: taskName });
	revalidatePath("/");
};

export const completeTask = async (taskId: number) => {
	await db
		.update(tasks)
		.set({ isChecked: not(tasks.isChecked) })
		.where(eq(tasks.id, taskId));
	revalidatePath("/");
};

export const deleteTask = async (taskId: number) => {
	await db.delete(tasks).where(eq(tasks.id, taskId));
	revalidatePath("/");
};
