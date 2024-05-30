/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";

export default defineConfig({
	plugins: [react(), UnoCSS()],
	server: {
		proxy: {
			"/api": "http://localhost:3000",
		},
	},
	test: {
		coverage: {
			provider: "istanbul",
			reporter: ["html"],
		},
	},
});
