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
router.post("/", multer().none(), async function(req, res) {
  const { fname } = req.body;
  try {
    const fetchRes = await fetch(`${process.env.ATLAS_URL}/insertOne`, {
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
  } catch {
  }
  return res.sendStatus(500);
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
