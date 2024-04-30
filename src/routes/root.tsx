import { useEffect, useState } from "react";
import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
	useUser,
	UserButton
} from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

import Nav from "../components/Nav";

export default function Root() {
	const { user } = useUser();

	const [admin, setAdmin] = useState(false);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (user?.publicMetadata.role === "admin") {
			setAdmin(true);
		}
	});

	return (
		<>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<SignedIn>
				<Nav admin={admin} setOpen={setOpen} />
				<UserButton />
				<Outlet context={{ admin, setOpen }} />
				<Snackbar
					open={open}
					autoHideDuration={1000}
					message="Access denied"
					onClose={function () {
						setOpen(false);
					}}
				/>
			</SignedIn>
		</>
	);
}
