import "dotenv/config";
import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import multer from "multer";

const router = Router();

router.use(ClerkExpressRequireAuth());
router.post("/", multer().none(), function (req, res) {
	return res.send(req.body);
});

export default router;
