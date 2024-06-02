import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import "@fontsource/jetbrains-mono";
import { defineConfig } from "unocss";
import presetWind from "@unocss/preset-wind";

import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Root from "./routes/root";
import Admin, { loader as adminLoader } from "./routes/Admin";
import Home from "./routes/Home";

import "virtual:uno.css";
defineConfig({
	presets: [presetWind()],
});

const router = createBrowserRouter([
	{
		path: "sign-in",
		element: <SignIn />,
	},
	{
		path: "sign-up",
		element: <SignUp />,
	},
	{
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
				index: true,
			},
			{
				path: "/admin",
				element: <Admin />,
				loader: adminLoader,
			},
		],
	},
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ClerkProvider
			publishableKey={PUBLISHABLE_KEY}
			appearance={{
				variables: {
					fontFamily: "JetBrains Mono",
				},
			}}
		>
			<RouterProvider router={router} />
		</ClerkProvider>
	</React.StrictMode>,
);

function ErrorPage() {
	return <h3 className="italic">Error</h3>;
}
