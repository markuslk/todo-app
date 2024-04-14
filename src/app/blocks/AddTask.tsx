"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTask } from "@/db/queries";
import { ChangeEvent, useState } from "react";

const AddTask = () => {
	const [value, setValue] = useState<string>("");

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleAdd = async () => {
		await createTask(value);
		setValue("");
	};

	return (
		<div className="flex flex-row gap-4 place-content-center">
			<Input
				className="max-w-md w-full"
				value={value}
				onChange={handleInput}
			/>
			<Button
				variant={"default"}
				size={"sm"}
				onClick={handleAdd}>
				Add Todo
			</Button>
		</div>
	);
};
export default AddTask;
