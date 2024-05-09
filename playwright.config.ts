import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/e2e",
	reporter: "list",
	projects: [
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] }
		}
	]
});
