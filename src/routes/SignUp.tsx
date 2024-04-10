import {
	ClerkLoaded,
	ClerkLoading,
	SignUp as ClerkSignUp
} from "@clerk/clerk-react";

export default function SignUp() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "calc(100vh - 40px)"
			}}
		>
			<ClerkLoading>Loading...</ClerkLoading>
			<ClerkLoaded>
				<ClerkSignUp />
			</ClerkLoaded>
		</div>
	);
}
