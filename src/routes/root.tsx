import { useEffect, useState } from "react";
import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
	useUser,
	UserButton,
} from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Root() {
	const { user } = useUser();

	const admin = user?.publicMetadata.role === "admin";

	const [open, setOpen] = useState(false);
	const toast = {
		open,
		setOpen,
	};

	useEffect(() => {
		if (open)
			setTimeout(() => {
				setOpen(false);
			}, 1000);
	}, [open]);

	return (
		<>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<SignedIn>
				<Nav admin={admin} toast={toast} />
				<UserButton />
				<Outlet context={{ admin, toast }} />
				<dialog open={open}>Access denied</dialog>
				<Footer />
			</SignedIn>
		</>
	);
}
