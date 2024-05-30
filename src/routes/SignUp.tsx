import {
	ClerkLoaded,
	ClerkLoading,
	SignUp as ClerkSignUp,
} from "@clerk/clerk-react";

export default function SignUp() {
	return (
		<div className="grid h-full place-content-center">
			<ClerkLoading>Loading...</ClerkLoading>
			<ClerkLoaded>
				<ClerkSignUp />
			</ClerkLoaded>
		</div>
	);
}
