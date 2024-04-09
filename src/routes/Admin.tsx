import { Protect } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
	const navigate = useNavigate();
	return (
		<>
			<Protect
				role="org:admin"
				fallback={
					<>
						<h3 style={{ fontStyle: "italic" }}>403</h3>
						<button onClick={() => navigate(-1)}>Go back</button>
					</>
				}
			>
				<h3 style={{ fontStyle: "italic" }}>Admin</h3>
			</Protect>
		</>
	);
}
