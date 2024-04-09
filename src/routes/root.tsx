import { useEffect } from "react";
import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
	useAuth,
	UserButton,
	useOrganizationList
} from "@clerk/clerk-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Root() {
	const location = useLocation();
	const { isLoaded, isSignedIn, orgId } = useAuth();
	const { setActive } = useOrganizationList();
	const navigate = useNavigate();
	useEffect(() => {
		if (isLoaded && isSignedIn) {
			if (!orgId && setActive) {
				setActive({
					organization: process.env.DEFAULT_ORGANIZATION_ID
				});
			}

			if (location.pathname === "/") {
				return navigate("/home");
			}
		}
	});
	return (
		<>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<SignedIn>
				<UserButton />
				<Outlet />
			</SignedIn>
		</>
	);
}
