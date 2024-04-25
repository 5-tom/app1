import { Link, useNavigate } from "react-router-dom";

export default function Nav({ admin, setOpen }: any) {
	const navigate = useNavigate();
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/admin">Admin (for testing)</Link>
			<br />
			{admin && (
				<button onClick={() => (!admin ? setOpen(true) : navigate("/admin"))}>
					Admin
				</button>
			)}
		</nav>
	);
}
