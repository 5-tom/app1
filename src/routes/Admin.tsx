import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Admin() {
	const { admin, setOpen }: { [key: string]: any } = useOutletContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!admin) {
			setOpen(true);
			return navigate("/");
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
