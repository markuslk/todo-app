"use server";

import { SignInSchema, SignupFormSchema } from "@/lib/lib";
import { InferInsertModel, and, asc, desc, eq, not } from "drizzle-orm";
import db from "./drizzle";
import { tasks, users } from "./schema";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export const getAllUsersTasks = async (userId: number) => {
	const data = await db.query.tasks.findMany({
		where: eq(tasks.userId, userId),
		orderBy: tasks.isChecked,
	});
	return data;
};

export const getTask = async (taskId: number) => {
	const data = await db.query.tasks.findFirst({
		where: (tasks, { eq }) => eq(tasks.id, taskId),
	});

	return data;
};

export const createTask = async (taskName: string, userId: number) => {
	await db.insert(tasks).values({ name: taskName, userId: userId });
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

export type CreateUserProps = InferInsertModel<typeof users>;

export const createUser = async (formData: FormData) => {
	const validateFields = SignupFormSchema.safeParse({
		email: formData.get("email"),
		name: formData.get("name"),
		password: formData.get("password"),
	});

	if (!validateFields.success) {
		validateFields.error;
		console.log(validateFields.error);
	} else {
		const { email, name, password } = validateFields.data;

		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email),
		});

		if (existingUser) {
			return {
				message: "Email already exists.",
			};
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await db.insert(users).values({
			email: email,
			name: name,
			password: hashedPassword,
		});
		redirect("/sign-in");
	}
};

export async function logout() {
	deleteSession();
	redirect("/sign-in");
}

export async function login(formData: FormData) {
	const validateFields = SignInSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validateFields.success) {
		validateFields.error;
		console.log(validateFields.error);
	} else {
		const { email, password } = validateFields.data;

		const user = await db.query.users.findFirst({
			where: eq(users.email, email),
		});

		const passwordMatches = await bcrypt.compare(password, user?.password as string);

		if (!user || !passwordMatches) {
			return {
				message: "Something went wrong with authenticating users",
			};
		}
		if (user && passwordMatches) {
			createSession(user.id);
			redirect("/");
		}
	}
}

export async function getUser(userId: number) {
	try {
		const [userData] = await db
			.select({
				id: users.id,
				name: users.name,
				email: users.email,
			})
			.from(users)
			.where(eq(users.id, userId));

		return userData;
	} catch (err) {
		console.log(err, "Failed to fetch user data");
		return null;
	}
}
