import { z } from "zod";

export const SignupFormSchema = z.object({
	email: z.string().email().trim(),
	name: z.string().min(2).trim(),
	password: z.string().min(5).trim(),
});

export const SignInSchema = z.object({
	email: z.string().email().trim(),
	password: z.string().min(5).trim(),
});
