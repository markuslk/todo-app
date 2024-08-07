import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
	path: ".env.local",
});

export default {
	schema: "./src/db/schema.ts",
	out: "./src/db/migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!,
	},
} satisfies Config;
