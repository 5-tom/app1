import { clerkClient } from "@clerk/clerk-sdk-node";
import Cookies from "cookies";
import "dotenv/config";
import { Router } from "express";
import jwt from "jsonwebtoken";

import form from "./form";

const router = Router();

router.get("/foo", async (req, res) => {
	const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
	const cookies = new Cookies(req, res);
	const sessToken = cookies.get("__session");
	const decoded = jwt.verify(sessToken, publicKey);
	const user = await clerkClient.users.getUser(decoded.sub);
	if (user.publicMetadata.role === "admin") {
		return res.sendStatus(200);
	} else {
		return res.sendStatus(403);
	}
});

router.get("/bar", async (req, res) => {
	try {
		const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
		const sessToken = req.get("Authorization").split(" ")[1];
		const decoded = jwt.verify(sessToken, publicKey);
		const user = await clerkClient.users.getUser(decoded.sub);
		console.log(user.publicMetadata.role);
	} catch {}
	return res.sendStatus(200);
});

router.use("/form", form);

export default router;
