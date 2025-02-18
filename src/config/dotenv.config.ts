import dotenv from "dotenv";
import path from "path";
export enum Environment {
    DEVELOPMENT = 'DEVELOPMENT',
    PRODUCTION = 'PRODUCTION',
    TEST = 'TEST',
}
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export class DotEnvConfig {
    static PORT = process.env.PORT
    static NODE_ENV = process.env.NODE_ENV;
    static LOG_LEVEL = process.env.LOG_LEVEL;
    static HOST = process.env.HOST
    static DB_TYPE = process.env.DB_TYPE
    static DB_PORT = process.env.DB_PORT ?? 5432
    static DB_NAME = process.env.DB_NAME
    static DB_USER = process.env.DB_USER
    static DB_PASSWORD = process.env.DB_PASSWORD
}