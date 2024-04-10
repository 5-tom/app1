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
import {
	Outlet,
	useLocation,
	useNavigate,
	Link,
	useSearchParams
} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

export default function Root() {
	const { getToken, has, isLoaded, isSignedIn, orgId, userId } = useAuth();
	const { setActive } = useOrganizationList();

	const location = useLocation();
	const navigate = useNavigate();

	const [member, setMember] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [inDefaultOrg, setInDefaultOrg] = useState(false);

	const [open, setOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (searchParams.get("403") === "true") {
			setSearchParams();
			setOpen(true);
		}

		if (isLoaded && isSignedIn) {
			const defaultOrgId = import.meta.env.VITE_DEFAULT_ORG_ID;
			if (orgId !== defaultOrgId) {
				if (setActive) {
					getToken().then((token) => {
						fetch("/api/create-organization-membership", {
							method: "post",
							body: JSON.stringify({
								organizationId: defaultOrgId,
								userId,
								role: "org:member"
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

			if (location.pathname === "/") {
				return navigate("/home");
			}
		}
	});

	if (!inDefaultOrg)
		return (
			<>
				<SignedOut>
					<RedirectToSignIn />
				</SignedOut>
				<SignedIn>
					An unexpected error occured, and as a result you're not using the
					default organisation. Please contact support.
					<br />
					<SignOutButton />
				</SignedIn>
			</>
		);

	return (
		<>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<SignedIn>
				<Link to="/">slash</Link>
				<br />
				<Link to="/admin">admin</Link>
				<UserButton />
				<Outlet context={[member, admin]} />
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
