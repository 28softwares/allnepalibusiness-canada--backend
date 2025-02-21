import dotenv from "dotenv";
import path from "path";
import jwt, { JwtPayload } from "jsonwebtoken";
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


    //db
    static HOST = process.env.HOST
    static DB_TYPE = process.env.DB_TYPE
    static DB_PORT = process.env.DB_PORT ?? 5432
    static DB_NAME = process.env.DB_NAME
    static DB_USER = process.env.DB_USER
    static DB_PASSWORD = process.env.DB_PASSWORD


    //file upload paths
    static MEDIA_UPLOAD_PATH = process.env.MEDIA_UPLOAD_PATH;
    static TEMP_FOLDER_PATH = process.env.TEMP_FOLDER_PATH!;



    // SECRETS
    static JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;
    static JWT_EXPIRY = process.env.JWT_EXPIRY as JwtPayload['exp'];
    static JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as jwt.Secret;
    static JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY as JwtPayload['exp'];
    static STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
    static STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;
    static ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
    static IV = process.env.IV;
    static GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    static RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

    // MAIL
    static MAIL_HOST = process.env.MAIL_HOST;
    static MAIL_USER = process.env.MAIL_USER;
    static MAIL_PASSWORD = process.env.MAIL_PASS;


    //URLs
    static FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
    static BASE_URL = process.env.BASE_URL;
}