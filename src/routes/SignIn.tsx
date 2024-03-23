import { SignIn as ClerkSignIn, useAuth } from "@clerk/clerk-react";

export default function SignIn() {
	const { isLoaded } = useAuth();
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "calc(100vh - 40px)"
			}}
		>
			{!isLoaded && "Loading..."}
			<ClerkSignIn />
		</div>
	);
}
