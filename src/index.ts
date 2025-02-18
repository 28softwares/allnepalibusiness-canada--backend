import express, { json, urlencoded } from "express";
import AppDataSource from "./config/database.config";
import { RegisterRoutes } from "./routes/routes";
import { DotEnvConfig } from "./config/dotenv.config";

const app = express();
app.use(
  urlencoded({
    extended: true
  })
);
app.use(json());
RegisterRoutes(app);

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
