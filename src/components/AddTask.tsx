"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTask } from "@/db/queries";
import { ChangeEvent, useState, useTransition } from "react";

const AddTask = ({ userId }: { userId: number }) => {
	const [isPending, startTransition] = useTransition();
	const [value, setValue] = useState<string>("");

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleAdd = () => {
		startTransition(async () => {
			await createTask(value, userId);
			setValue("");
		});
	};

	return (
		<div className="flex flex-row gap-4 place-content-center w-full max-w-md">
			<Input
				value={value}
				onChange={handleInput}
			/>
			<Button
				variant={"default"}
				size={"sm"}
				onClick={handleAdd}
				disabled={isPending}>
				Add Todo
			</Button>
		</div>
	);
};
export default AddTask;
