import { Link, useNavigate } from "react-router-dom";

export default function Nav({ admin, toast }: any) {
	const navigate = useNavigate();
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/admin">Admin (for testing)</Link>
			<br />
			{admin && (
				<button
					onClick={() => (!admin ? toast.setOpen(true) : navigate("/admin"))}
				>
					Admin
				</button>
			)}
			<button
				onClick={() => (!admin ? toast.setOpen(true) : navigate("/admin"))}
			>
				Admin (for testing)
			</button>
		</nav>
	);
}
