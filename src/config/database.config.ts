import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DotEnvConfig } from "./dotenv.config";

const AppDataSource = new DataSource({
  type: DotEnvConfig.DB_TYPE as "postgres",
  host: DotEnvConfig.HOST,
  port: +DotEnvConfig.DB_PORT,
  username: DotEnvConfig.DB_USER,
  password: DotEnvConfig.DB_PASSWORD,
  database: DotEnvConfig.DB_NAME,
  synchronize: true,
  entities: [`${__dirname}/../entities/**/*.entity{.js,.ts}`], // use path.join() for windows
  namingStrategy: new SnakeNamingStrategy(),
  // logging: true,
  // dropSchema: true
});

export default AppDataSource;




