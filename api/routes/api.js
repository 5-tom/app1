import { Router } from "express";

import form from "./form";

const router = Router();

router.use("/form", form);

export default router;
