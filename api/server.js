import express from "express";
import serverless from "serverless-http";
import helmet from "helmet";

import api from "./routes/api";

const app = express();

app.use(helmet());

app.use("/api", api);

app.listen(3000);
export const handler = serverless(app);
