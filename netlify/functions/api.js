// api/server.js
import express from "express";
import serverless from "serverless-http";

// api/routes/api.js
import { Router as Router2 } from "express";

// api/routes/form.js
import "dotenv/config";
import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import multer from "multer";
var router = Router();
router.use(ClerkExpressRequireAuth());
router.post("/", multer().none(), function(req, res) {
  return res.send(req.body);
});
var form_default = router;

// api/routes/api.js
var router2 = Router2();
router2.use("/form", form_default);
var api_default = router2;

// api/server.js
var app = express();
app.use("/api", api_default);
app.listen(3e3);
var handler = serverless(app);
export {
  handler
};
