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
				className={cn("flex place-content-between items-center border p-4 rounded-xl border-primary dark:bg-black bg-gray-200", {
					"bg-opacity-20 dark:bg-opacity-20": isChecked,
				})}>
				<h3
					className={cn("font-semibold dark:text-white text-gray-900", {
						"line-through": isChecked,
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
