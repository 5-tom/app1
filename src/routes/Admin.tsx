import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
	const navigate = useNavigate();
	const { has } = useAuth();
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		if (has({ role: "org:admin" })) {
			setIsAdmin(true);
		} else {
			return navigate("/home?403=true");
		}
	}, []);

	if (isAdmin) {
		return (
			<>
				<h3 style={{ fontStyle: "italic" }}>Admin</h3>
			</>
		);
	}
}
