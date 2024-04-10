import { useEffect, useState } from "react";
import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
	SignOutButton,
	useAuth,
	UserButton,
	useOrganizationList
} from "@clerk/clerk-react";
import { Outlet, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

import Nav from "../components/Nav";
import Home from "./Home";

export default function Root() {
	const { getToken, has, isLoaded, isSignedIn, orgId, userId } = useAuth();
	const { setActive } = useOrganizationList();

	const location = useLocation();

	const [member, setMember] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [inDefaultOrg, setInDefaultOrg] = useState(false);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (isLoaded && isSignedIn) {
			const defaultOrgId = import.meta.env.VITE_DEFAULT_ORG_ID;
			if (orgId !== defaultOrgId) {
				if (setActive) {
					getToken().then((token) => {
						fetch("/api/create-organization-membership", {
							method: "post",
							body: JSON.stringify({
								userId
							}),
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json"
							}
						}).then((res) => {
							if (res.ok) {
								setActive({ organization: defaultOrgId });
							}
						});
					});
				}
			} else {
				setInDefaultOrg(true);
			}

			if (has({ role: "org:member" })) {
				setMember(true);
			}
			if (has({ role: "org:admin" })) {
				setAdmin(true);
			}
		}
	});

	return (
		<>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<SignedIn>
				{!inDefaultOrg ? (
					<>
						An unexpected error occured, and as a result you're not using the
						default organisation. Please contact support.
						<br />
						<SignOutButton />
					</>
				) : (
					<>
						<Nav />
						<UserButton />
						{location.pathname === "/" ? (
							<Home />
						) : (
							<Outlet context={[member, admin, setOpen]} />
						)}
						<Snackbar
							open={open}
							autoHideDuration={1000}
							message="Access denied"
							onClose={function () {
								setOpen(false);
							}}
						/>
					</>
				)}
			</SignedIn>
		</>
	);
}
