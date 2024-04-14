"use client";
import { AnimatePresence, motion } from "framer-motion";
import Task from "./Task";

interface TaskProps {
	id: number;
	name: string;
	isChecked: boolean;
}
interface TaskListProps {
	data: TaskProps[];
}

const TaskList = ({ data }: TaskListProps) => {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.075,
			},
		},
	};

	return (
		<motion.ul
			variants={container}
			initial="hidden"
			animate="show"
			className="space-y-4">
			<AnimatePresence>
				{data.map((task: TaskProps) => (
					<Task
						key={task.id}
						id={task.id}
						name={task.name}
						isChecked={task.isChecked}
					/>
				))}
			</AnimatePresence>
		</motion.ul>
	);
};
export default TaskList;
