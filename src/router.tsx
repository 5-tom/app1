import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import SignIn from "./routes/SignIn";
import Root from "./routes/root";
import Home from "./routes/Home";

const router = createBrowserRouter([
	{
		path: "sign-in",
		element: <SignIn />
	},
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/home",
				element: <Home />
			}
		]
	}
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<RouterProvider router={router} />
		</ClerkProvider>
	</React.StrictMode>
);

function ErrorPage() {
	return <h3 style={{ fontStyle: "italic" }}>Error</h3>;
}
