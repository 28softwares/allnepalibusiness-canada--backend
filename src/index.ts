import app from "./config/app.config";
import express, { json, urlencoded } from "express";
import AppDataSource from "./config/database.config";
import { RegisterRoutes } from "./routes/routes";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((error) => {
    console.log("Error in starting server", error);
  });
