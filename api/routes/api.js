import clerkClient from "@clerk/clerk-sdk-node";
import { json, Router } from "express";

import form from "./form";

const router = Router();

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
