import express, { urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../routes/routes';
import errorHandler from './errorHandler.middlware';
import { DotEnvConfig, Environment } from '../config/dotenv.config';
import cors from 'cors';
import swaggerDocument from '../../public/swagger.json';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import cookieParser from "cookie-parser"
export const configMiddleware = (app: express.Application) => {
    app.use(express.json(), compression());
    app.use(cookieParser());
    app.use(
        cors({
            origin: [DotEnvConfig.FRONTEND_BASE_URL!],
            methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        }),
    );
    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000, // 10 minutes
        max: 1000, // Limit each IP to 1000 requests per `window` (here, per 10 minutes).
        standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        // store: ... , // Redis, Memcached, etc. See below.
    });

    app.use(limiter);
    app.use(
        urlencoded({
            extended: true,
        }),
    );

    if (DotEnvConfig.NODE_ENV === Environment.DEVELOPMENT) {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use('/swagger.json', (req, res) => res.send(swaggerDocument));
    }
    app.use(express.static(DotEnvConfig.MEDIA_UPLOAD_PATH!));
    app.use(express.static(DotEnvConfig.TEMP_FOLDER_PATH!));
    RegisterRoutes(app);
    app.use(errorHandler)
};
