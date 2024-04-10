import { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function Admin() {
	const [member, admin]: Array<boolean> = useOutletContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!admin) {
			return navigate("/home?403=true");
		}
	}, []);

	if (admin) {
		return (
			<>
				<h3 style={{ fontStyle: "italic" }}>Admin</h3>
			</>
		);
	}
}
