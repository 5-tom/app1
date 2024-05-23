import { clerkClient } from "@clerk/fastify";
import Cookies from "cookies";
import "dotenv/config";
import jwt from "jsonwebtoken";

import type { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance) {
	fastify.get("/foo", async (req, reply) => {
		const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
		const cookies = new Cookies(req, reply);
		const sessToken = cookies.get("__session");
		const decoded = jwt.verify(sessToken, publicKey);
		const user = await clerkClient.users.getUser(decoded.sub);
		if (user.publicMetadata.role === "admin") {
			return { hello: "world" };
		} else {
			throw new Error();
		}
	});

	fastify.get("/bar", async (req, reply) => {
		let role;
		try {
			const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
			const sessToken = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(sessToken, publicKey);
			const user = await clerkClient.users.getUser(decoded.sub);
			role = user.publicMetadata.role;
		} catch (err) {
			console.log(err);
		}
		return { role };
	});
}

export default routes;
