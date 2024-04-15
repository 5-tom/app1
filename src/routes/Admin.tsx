import { useEffect } from "react";
import { useNavigate, useOutletContext, redirect } from "react-router-dom";

export async function loader() {
	await fetch("/api/foo").then((res) => {
		if (!res.ok) {
			throw redirect("/");
		}
	});
	return null;
}

export default function Admin() {
	const { admin, setOpen }: { [key: string]: any } = useOutletContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!admin) {
			setOpen(true);
			return navigate("/");
		}
	}, []);

	if (admin) {
		return (
			<>
				<h3 style={{ fontStyle: "italic" }}>Admin</h3>
			</>
		);
	}
}
