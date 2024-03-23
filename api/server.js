import express from "express";
import serverless from "serverless-http";

import api from "./routes/api";

const app = express();

app.use("/api", api);

app.listen(3000);
export const handler = serverless(app);
