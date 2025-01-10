import express from "express";
import middlewares from "../middlewares/index.middleware";

const app = express();
middlewares(app);

// crons jobs
export default app;
