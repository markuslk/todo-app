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
			className="h-8 w-8 p-0"
			onClick={handleComplete}
			disabled={isPending}>
			{isChecked ? <Undo2 className="h-5 w-5" /> : <Check className="h-5 w-5" />}
		</Button>
	);
};
export default CompleteTask;
