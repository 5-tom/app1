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
	const { admin, toast }: { [key: string]: any } = useOutletContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!admin) {
			toast.setOpen(true);
			navigate("/");
		}
	}, [admin]);

	const { getToken } = useAuth();
	if (admin) {
		return (
			<>
				<h3 className="italic">Admin</h3>
				<button
					onClick={async () => {
						fetch("/api/bar", {
							headers: {
								Authorization: `Bearer ${await getToken()}`,
							},
						});
					}}
				>
					See role
				</button>
			</>
		);
	}
}
