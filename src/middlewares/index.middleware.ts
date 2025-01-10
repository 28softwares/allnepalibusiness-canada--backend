import compression from "compression";
import cors from "cors";
import express, { Application, json, urlencoded } from "express";
import { rateLimit } from "express-rate-limit";
import { RegisterRoutes } from "../routes/routes";
import errorHandler from "./errorHandler.middleware";

const middlewares = (app: Application) => {
  app.use(
    urlencoded({
      extended: true,
    })
  );

  app.use(cors({ origin: "*" }));
  app.use(compression());
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 10 minutes
    max: 1000, // Limit each IP to 1000 requests per `window` (here, per 10 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
  });
  app.use(limiter);
  app.use(json());
  app.use(express.static("public"));

  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = require("../../public/swagger.json");

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/swagger-json", (req, res) => {
    res.sendFile("public/swagger.json", { root: "." });
  });

  RegisterRoutes(app);
  // @ts-ignore
  app.use(errorHandler);
};

export default middlewares;
