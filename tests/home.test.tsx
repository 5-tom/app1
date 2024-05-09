// @vitest-environment jsdom
import React from "react";
import { afterAll, beforeAll, afterEach, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { ClerkProvider } from "@clerk/clerk-react";

import Home from "../src/routes/Home";

const posts = [
	{
		userId: 1,
		id: 1,
		title: "first post title",
		body: "first post body"
	}
	// ...
];

export const restHandlers = [
	http.get("api/form", () => {
		return HttpResponse.json(posts);
	})
];

test("Home has the text 'Home'.", async function () {
	render(
		<ClerkProvider
			publishableKey={String(process.env.VITE_CLERK_PUBLISHABLE_KEY)}
		>
			<Home />
		</ClerkProvider>
	);
	//const textField = await screen.findAllByPlaceholderText("email")
	//fireEvent.input(textField[0], "hello@world.com")
	expect(screen.getByText("Home")).toBeDefined();
});

const server = setupServer(...restHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
