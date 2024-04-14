"use client";
import { Button } from "@/components/ui/button";
import { completeTask } from "@/db/queries";
import { Check } from "lucide-react";
import { useTransition } from "react";

const CompleteTask = ({ taskId }: { taskId: number }) => {
	const [isPending, startTransition] = useTransition();

	const handleComplete = () => {
		startTransition(async () => {
			await completeTask(taskId);
		});
	};

	return (
		<Button
			variant={"default"}
			size={"icon"}
			onClick={handleComplete}
			disabled={isPending}>
			<Check />
		</Button>
	);
};
export default CompleteTask;
