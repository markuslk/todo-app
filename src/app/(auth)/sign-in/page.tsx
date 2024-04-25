import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/db/queries";
import Link from "next/link";

const SignInPage = async () => {
	return (
		<div className="max-w-7xl mx-auto relative py-10 lg:py-20 px-4 lg:px-8 flex flex-col justify-center">
			<div className="flex items-center flex-col justify-center">
				<Card className="w-full max-w-sm lg:max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>Enter your email below to login to your account.</CardDescription>
					</CardHeader>
					<form action={login}>
						<CardContent className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									name="email"
									placeholder="m@example.com"
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
							<Button className="w-full">Sign in</Button>
							<Link
								href={"/sign-up"}
								className={buttonVariants({
									variant: "link",
									className: "gap-1.5 text-gray-500 dark:text-white",
								})}>
								Don&apos;t have an account? Sign-up
							</Link>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
};
export default SignInPage;
