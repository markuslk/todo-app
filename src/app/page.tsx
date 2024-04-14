import { getAllTasks } from "@/db/queries";
import AddTask from "../components/AddTask";
import ChangeTheme from "../components/ChangeTheme";
import TaskList from "@/components/TaskList";

export default async function Home() {
	const data = await getAllTasks();

	return (
		<main className="max-w-7xl mx-auto relative py-10 lg:py-20 px-4 lg:px-8">
			<div className="flex place-content-end">
				<ChangeTheme />
			</div>
			<div className="flex flex-col items-center">
				<h1 className="text-5xl font-bold text-center mb-8">Todo App</h1>
				<h3 className="mb-8">Welcome, Markus</h3>
				<AddTask />
				<div className="max-w-xl w-full py-8">
					<h3 className="text-2xl font-bold mb-4 border-b pb-4">List of your tasks</h3>
					<TaskList data={data} />
				</div>
			</div>
		</main>
	);
}
