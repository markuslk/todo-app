import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/db/queries";
import Link from "next/link";

const SignUpPage = async () => {
	return (
		<div className="max-w-7xl mx-auto relative py-10 lg:py-20 px-4 lg:px-8 h-screen flex flex-col justify-center">
			<div className="flex items-center flex-col justify-center">
				<Card className="w-full max-w-sm lg:max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl">Register</CardTitle>
						<CardDescription>Enter your email below to create your account.</CardDescription>
					</CardHeader>
					<form action={createUser}>
						<CardContent className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									name="name"
									type="text"
									placeholder="Markus"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									type="password"
									required
								/>
							</div>
						</CardContent>
						<CardFooter className="grid gap-4">
							<Button
								type="submit"
								className="w-full">
								Sign up
							</Button>
							<Link
								href={"/sign-in"}
								className={buttonVariants({
									variant: "link",
									className: "gap-1.5 text-white",
								})}>
								Already have an account? Sign-in
							</Link>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
};
export default SignUpPage;
