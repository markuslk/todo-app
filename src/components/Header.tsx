import { logout } from "@/db/queries";
import ChangeTheme from "./ChangeTheme";
import { Button } from "./ui/button";
import { getSession } from "@/lib/session";

const Header = async () => {
	const session = await getSession();
	const currentUser = session?.user;

	return (
		<header className="max-w-screen-2xl w-full p-2 lg:p-4 flex items-center justify-center mx-auto">
			<div className="border-b w-full pb-2 lg:pb-4 border-gray-500 dark:border-white">
				<div className="flex items-center justify-between">
					<div className="font-semibold text-xl lg:font-bold lg:text-2xl">Todo App</div>
					<div className="flex gap-4 items-center justify-center">
						<ChangeTheme />
						{currentUser && (
							<form action={logout}>
								<Button
									type="submit"
									variant={"outline"}
									className="h-10"
									size={"sm"}>
									Log out
								</Button>
							</form>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;
