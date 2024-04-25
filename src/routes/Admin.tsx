import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, redirect } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

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

	const [rootDone, setRootDone] = useState(false);

	useEffect(() => {
		if (rootDone && !admin) {
			setOpen(true);
			navigate("/");
		}
	}, [rootDone, admin]);

	useEffect(() => {
		setRootDone(true);
	}, [admin]);

	const { getToken } = useAuth();
	if (admin) {
		return (
			<>
				<h3 style={{ fontStyle: "italic" }}>Admin</h3>
				<button
					onClick={async () => {
						fetch("/api/bar", {
							headers: {
								Authorization: `Bearer ${await getToken()}`
							}
						});
					}}
				>
					See role
				</button>
			</>
		);
	}
}
