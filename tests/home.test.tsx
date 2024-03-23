// @vitest-environment jsdom
import * as React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Home from "../src/routes/Home";

test("Home has the text 'Home'.", function () {
	render(<Home />);
	expect(screen.getByText("Home")).toBeDefined();
});
