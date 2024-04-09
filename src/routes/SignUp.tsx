import { SignUp as ClerkSignUp, useAuth } from "@clerk/clerk-react";

export default function SignUp() {
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
			<ClerkSignUp />
		</div>
	);
}
