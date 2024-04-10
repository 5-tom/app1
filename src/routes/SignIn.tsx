import {
	ClerkLoaded,
	ClerkLoading,
	SignIn as ClerkSignIn
} from "@clerk/clerk-react";

export default function SignIn() {
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
				<ClerkSignIn />
			</ClerkLoaded>
		</div>
	);
}
