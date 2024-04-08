import "dotenv/config";
import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import multer from "multer";

const router = Router();

router.use(ClerkExpressRequireAuth());
router.post("/", multer().none(), async function (req, res) {
	const { fname } = req.body;
	try {
		const fetchRes = await fetch(`${process.env.ATLAS_URL}/action/insertOne`, {
			method: "post",
			headers: {
				"api-key": process.env.ATLAS_API,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				collection: "emails",
				database: "db_name",
				dataSource: "Cluster0",
				document: { fname }
			})
		});
		return res.send(await fetchRes.json());
	} catch {}
	return res.sendStatus(500);
});

export default router;
