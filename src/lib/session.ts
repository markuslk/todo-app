"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import dotenv from "dotenv";
import { NextRequest } from "next/server";
import { getUser } from "@/db/queries";

dotenv.config({
	path: ".env.local",
});

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
	return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (err) {
		console.log("Failed to verify session");
	}
}

export async function createSession(userId: number) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
	const session = await encrypt({ userId, expiresAt });

	cookies().set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function getSession() {
	const session = cookies().get("session")?.value;
	if (!session) return null;

	const sessionData = await decrypt(session);
	const userId = sessionData?.userId as number;

	const user = await getUser(userId);
	return { user, session: sessionData };
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get("session")?.value;
	const payload = await decrypt(session);

	if (!session || !payload) {
		return null;
	}

	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	cookies().set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: "lax",
		path: "/",
	});
}

export async function deleteSession() {
	cookies().delete("session");
}
