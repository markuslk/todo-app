import { getAllUsersTasks } from "@/db/queries";
import AddTask from "../components/AddTask";
import TaskList from "@/components/TaskList";
import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await getSession();
	const currentUser = session?.user;
	if (!currentUser || !session) redirect("/sign-in");

	if (currentUser) {
		const tasks = await getAllUsersTasks(currentUser.id);

		return (
			<main className="max-w-7xl mx-auto relative py-5 lg:py-10 px-4 lg:px-8">
				<div className="flex flex-col items-center">
					<h3 className="text-3xl font-bold text-center mb-8">Organize your tasks</h3>
					<h3 className="mb-8">Welcome, {currentUser.name}</h3>
					<AddTask userId={currentUser.id} />
					<div className="max-w-xl w-full py-8">
						<h3 className="text-xl font-bold mb-4 border-b pb-4">List of your tasks</h3>
						<TaskList tasks={tasks} />
					</div>
				</div>
				<div>
					<pre>{JSON.stringify(session, null, 2)}</pre>
				</div>
			</main>
		);
	} else {
		<div>loading...</div>;
	}
}
