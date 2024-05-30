import {
	ClerkLoaded,
	ClerkLoading,
	SignIn as ClerkSignIn,
} from "@clerk/clerk-react";

export default function SignIn() {
	return (
		<div className="grid h-full place-content-center">
			<ClerkLoading>Loading...</ClerkLoading>
			<ClerkLoaded>
				<ClerkSignIn />
			</ClerkLoaded>
		</div>
	);
}
