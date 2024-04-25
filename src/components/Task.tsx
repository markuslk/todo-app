"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import CompleteTask from "./CompleteTask";
import DeleteTask from "./DeleteTask";

interface TaskProps {
	id: number;
	name: string;
	isChecked: boolean;
}

const Task = ({ id, name, isChecked }: TaskProps) => {
	const item = {
		hidden: { opacity: 0 },
		show: { opacity: 1 },
	};

	return (
		<AnimatePresence>
			<motion.li
				variants={item}
				key={id}
				transition={{ duration: 0.75 }}
				className={cn("flex place-content-between items-center align-middle border-b p-2 border-gray-200/40", {
					"bg-opacity-20 dark:bg-opacity-20": isChecked,
				})}>
				<h3
					className={cn("dark:text-white text-gray-900", {
						"line-through text-red-500 dark:text-red-500": isChecked,
					})}>
					{name}
				</h3>
				<div className="flex gap-2">
					<CompleteTask
						taskId={id}
						isChecked={isChecked}
					/>
					<DeleteTask taskId={id} />
				</div>
			</motion.li>
		</AnimatePresence>
	);
};
export default Task;
