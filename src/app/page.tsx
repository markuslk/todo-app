import { getAllTasks } from "@/db/queries";
import AddTask from "./blocks/AddTask";
import ChangeTheme from "./blocks/ChangeTheme";
import { cn } from "@/lib/utils";
import DeleteTask from "./blocks/DeleteTask";
import CompleteTask from "./blocks/CompleteTask";

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
					<ul className="space-y-4">
						{data.map((task) => (
							<li
								key={task.id}
								className={cn("flex place-content-between items-center border p-4 rounded-xl border-primary dark:bg-black bg-gray-200", {
									"bg-opacity-20 dark:bg-opacity-20": task.isChecked,
								})}>
								<h3
									className={cn("font-semibold dark:text-white text-gray-900", {
										"line-through": task.isChecked,
									})}>
									{task.name}
								</h3>
								<div className="flex gap-2">
									<CompleteTask
										taskId={task.id}
										isChecked={task.isChecked}
									/>
									<DeleteTask taskId={task.id} />
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
