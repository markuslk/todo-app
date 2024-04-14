"use server";
import db from "./drizzle";
import { tasks } from "./schema";
import { revalidatePath } from "next/cache";

export const getAllTasks = async () => {
	const data = await db.query.tasks.findMany();
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
