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
			size={"icon"}
			onClick={handleDelete}
			disabled={isPending}>
			<Trash2 className="w-5 h-5" />
		</Button>
	);
};
export default DeleteTask;
