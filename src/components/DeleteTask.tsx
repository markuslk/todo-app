"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTask } from "@/db/queries";
import { useTransition } from "react";

const DeleteTask = ({ taskId }: { taskId: number }) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		startTransition(async () => {
			await deleteTask(taskId);
		});
	};

	return (
		<Button
			variant={"destructive"}
			onClick={handleDelete}
			className="h-8 w-8 p-0"
			disabled={isPending}>
			<Trash2 className="h-5 w-5" />
		</Button>
	);
};
export default DeleteTask;
