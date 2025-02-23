import express from "express";
import AppDataSource from "./config/database.config";
import { DotEnvConfig } from "./config/dotenv.config";
import { configMiddleware } from "./middlewares";

const app = express();
configMiddleware(app)

function bootstrap() {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database connected successfully");
      app.listen(DotEnvConfig.PORT, () => {
        console.log(`Server is running on port ${DotEnvConfig.PORT}`);
      });
    })
    .catch((error) => {
      console.log("Error in starting server", error);
    });
}
bootstrap();