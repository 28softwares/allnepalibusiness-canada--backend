import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "iamsohappy",
  database: "businesscanda",
  synchronize: true,
  entities: [`${__dirname}/../entities/**/*.ts`],
  namingStrategy: new SnakeNamingStrategy(),
});

export default AppDataSource;
