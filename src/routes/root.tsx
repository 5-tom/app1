import { useEffect, useState } from "react";
import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
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
	const location = useLocation();
	const { isLoaded, isSignedIn, orgId } = useAuth();
	const { setActive } = useOrganizationList();
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (searchParams.get("403") === "true") {
			setSearchParams();
			setOpen(true);
		}

		if (isLoaded && isSignedIn) {
			if (!orgId && setActive) {
				setActive({
					organization: "" //process.env.DEFAULT_ORGANIZATION_ID
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
				<Link to="/">slash</Link>
				<Link to="/admin">admin</Link>
				<UserButton />
				<Outlet />
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
