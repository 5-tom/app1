import clerkClient from "@clerk/clerk-sdk-node";
import Cookies from "cookies";
import "dotenv/config";
import { json, Router } from "express";
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

router.use("/form", form);

router.use(json());
router.post("/create-organization-membership", async function (req, res) {
	const { userId } = req.body;
	try {
		await clerkClient.organizations.createOrganizationMembership({
			organizationId: process.env.VITE_DEFAULT_ORG_ID,
			userId,
			role: "org:member"
		});
		return res.status(200).send({ success: true });
	} catch (err) {
		const { status, errors } = err;
		return res.status(status).send({ message: errors[0].message });
	}
});

export default router;
