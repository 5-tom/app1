import "dotenv/config";
import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import multer from "multer";
import mongoose from "mongoose";
import Email from "../models/Email";

if (!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL");
mongoose.connect(process.env.DATABASE_URL);

const router = Router();

router.use(ClerkExpressRequireAuth());
router.post("/", multer().none(), async function (req, res) {
	try {
		const { email } = req.body;
		const newDoc = new Email({
			email
		});
		const a = await newDoc.save();
		console.log(a);
		//return res.send(await fetchRes.json());
		return res.sendStatus(200);
	} catch {
		return res.sendStatus(500);
	}
});

export default router;
