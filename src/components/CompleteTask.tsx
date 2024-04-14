"use client";
import { Button } from "@/components/ui/button";
import { completeTask } from "@/db/queries";
import { Check, Undo2 } from "lucide-react";
import { useTransition } from "react";

const CompleteTask = ({ taskId, isChecked }: { taskId: number; isChecked: boolean }) => {
	const [isPending, startTransition] = useTransition();

	const handleComplete = () => {
		startTransition(async () => {
			await completeTask(taskId);
		});
	};

	return (
		<Button
			variant={isChecked ? "outline" : "default"}
			size={"icon"}
			onClick={handleComplete}
			disabled={isPending}>
			{isChecked ? <Undo2 /> : <Check />}
		</Button>
	);
};
export default CompleteTask;
