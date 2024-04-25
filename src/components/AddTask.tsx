"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTask } from "@/db/queries";
import { LoaderCircle } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useState, useTransition } from "react";

const AddTask = ({ userId }: { userId: number }) => {
	const [isPending, startTransition] = useTransition();
	const [value, setValue] = useState<string>("");

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleAdd = () => {
		if (value.length >= 3) {
			startTransition(async () => {
				await createTask(value, userId);
				setValue("");
			});
		}
	};

	const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") handleAdd();
	};

	return (
		<div className="flex flex-row gap-4 place-content-center w-full max-w-md">
			<Input
				value={value}
				onChange={handleInput}
				onKeyDown={handleEnterClick}
			/>
			<Button
				variant={"default"}
				size={"sm"}
				type="submit"
				onClick={handleAdd}
				disabled={isPending}>
				{isPending ? (
					<>
						<LoaderCircle className="animate-spin h-5 w-5 mr-1" />
						Adding Task
					</>
				) : (
					"Add Task"
				)}
			</Button>
		</div>
	);
};
export default AddTask;
