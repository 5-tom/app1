import { useState } from "react";
import { Button, Dialog, TextField } from "@mui/material";
import { z } from "zod";
import { parseFormSafe } from "zodix";
import { useAuth } from "@clerk/clerk-react";

export default function Home() {
	const { getToken } = useAuth();

	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({
		action: "",
		data: new FormData(),
		schema: z.object({})
	});
	const initErrors: {
		[key: string]: string | null;
	} = {
		fname: null
	};
	const [errors, setErrors] = useState(initErrors);
	const [response, setResponse] = useState("");

	function handleClose() {
		setOpen(false);
	}

	async function submit() {
		setErrors(initErrors);
		const result = await parseFormSafe(form.data, form.schema);
		if (!result.success) {
			const fResult: { [key: string]: Array<string> } =
				result.error.flatten().fieldErrors;
			const zErrors = initErrors;
			for (const key in fResult) {
				zErrors[key] = fResult[key][0];
			}
			setErrors(zErrors);
			setOpen(false);
			return;
		}
		fetch(form.action, {
			method: "post",
			body: form.data,
			headers: { Authorization: `Bearer ${await getToken()}` }
		}).then(async function (res) {
			setResponse(await res.json());
		});
		setOpen(false);
	}

	return (
		<>
			<span>Home</span>
			<form
				onSubmit={function (e) {
					e.preventDefault();
					setForm({
						action: "/api/form",
						data: new FormData(e.currentTarget),
						schema: z.object({ fname: z.string().email() })
					});
					setOpen(true);
				}}
			>
				<TextField
					name="fname"
					required
					error={errors.fname ? true : false}
					helperText={errors.fname ?? errors.fname}
					placeholder="email"
				/>
				<Button type="submit">Submit</Button>
			</form>
			<span>Response:</span>
			<br />
			{String(response["fname"])}
			<Dialog onClose={handleClose} open={open}>
				<Button onClick={submit}>Submit</Button>
				<Button onClick={handleClose}>Close</Button>
			</Dialog>
		</>
	);
}
