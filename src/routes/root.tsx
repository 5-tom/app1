import { useEffect, useState } from "react";
import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
	useAuth,
	UserButton
} from "@clerk/clerk-react";
import { Outlet, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

import Nav from "../components/Nav";
import Home from "./Home";

export default function Root() {
	const { has, isLoaded, isSignedIn } = useAuth();

	const location = useLocation();

	const [member, setMember] = useState(false);
	const [admin, setAdmin] = useState(false);

	const [open, setOpen] = useState(false);

	// useEffect(() => {
	// 	if (isLoaded && isSignedIn) {
	// 		if (has({ role: "org:member" })) {
	// 			setMember(true);
	// 		}
	// 		if (has({ role: "org:admin" })) {
	// 			setAdmin(true);
	// 		}
	// 	}
	// });

	return (
		<>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<SignedIn>
				<Nav />
				<UserButton />
				{location.pathname === "/" ? (
					<Home />
				) : (
					<Outlet context={{ member, admin, setOpen }} />
				)}
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
