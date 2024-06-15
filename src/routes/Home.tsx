import { useRef, useState } from "react";
import { z } from "zod";
import { parseFormSafe } from "zodix";
import { useAuth } from "@clerk/clerk-react";

export default function Home() {
	const { getToken } = useAuth();

	const [form, setForm] = useState({
		action: "",
		data: new FormData(),
		schema: z.object({}),
	});
	const initErrors: {
		[key: string]: string | null;
	} = {
		email: null,
		foo: null,
	};
	const [errors, setErrors] = useState(initErrors);
	const [response, setResponse] = useState("");

	function handleClose() {
		ref.current?.close();
	}

	async function submit() {
		setErrors(initErrors);
		const result = await parseFormSafe(form.data, form.schema);
		if (!result.success) {
			const fResult: { [key: string]: Array<string> } =
				result.error.flatten().fieldErrors;
			const zErrors = structuredClone(initErrors);
			for (const key in fResult) {
				zErrors[key] = fResult[key][0];
			}
			setErrors(zErrors);
			// 'Modal dialog boxes interrupt interaction with the rest of the page'. .reportValidity() doesn't work unless the modal dialog box is closed.
			ref.current?.close();
			for (const key in zErrors) {
				document
					.getElementsByName(key)[0]
					.setCustomValidity(zErrors[key] ? zErrors[key] : "");
			}
			ref2.current?.reportValidity();
			return;
		}

		try {
			ref.current?.close();
			const res = await fetch(form.action, {
				method: "post",
				body: form.data,
				headers: { Authorization: `Bearer ${await getToken()}` },
			});
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			setResponse(await res.json());
			ref2.current?.reset();
		} catch (err) {
			alert(err);
		}
	}

	const ref = useRef<HTMLDialogElement>(null);
	const ref2 = useRef<HTMLFormElement>(null);

	return (
		<>
			<span>Home</span>
			<form
				ref={ref2}
				noValidate
				onSubmit={function (e) {
					e.preventDefault();
					setForm({
						action: "/api/form",
						data: new FormData(e.currentTarget),
						schema: z.object({
							email: z.string().email(),
							foo: z.string().min(2),
						}),
					});
					ref.current?.showModal();
				}}
			>
				<input name="email" placeholder="email" />
				<br />
				<input name="foo" placeholder="bar" />
				<button type="submit">Submit</button>
			</form>
			<span>Response:</span>
			<br />
			{JSON.stringify(response)}
			<dialog ref={ref}>
				<button onClick={submit}>Submit</button>
				<button onClick={handleClose}>Close</button>
			</dialog>
		</>
	);
}
