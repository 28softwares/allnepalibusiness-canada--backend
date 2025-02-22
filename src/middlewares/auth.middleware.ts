import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { DotEnvConfig } from '../config/dotenv.config';
import messages from '../constants/messages';
import { AppError } from '../utils/appError.util';
import { User } from '../entities/user/User.entity';
import { Role } from '../constants/appConstants';

export function authMiddleware(role?: Role[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.get('Authorization');
        const token = authHeader?.split(' ')[1];

        interface JWTPayload {
            email: string;
            userId: string;
            role?: Role;
            iat: string;
            exp: string;
        }
        let user: JWTPayload | null = null;

        try {
            user = jwt.verify(
                token ?? '',
                DotEnvConfig.JWT_SECRET,
            ) as unknown as JWTPayload;

            if (role && !role.includes(user.role!)) {
                return res.status(403).json({
                    message: 'You are not able to access this resource !',
                    status: 'PERMISSION_DENIED',
                });
            }
        } catch {
            if (req.cookies.nrccfresh) {
                // if refresh token is avaiable and not expired, then send new access token.
                const refreshToken = req.cookies.nrccfresh;
                try {
                    const user = jwt.verify(
                        refreshToken,
                        DotEnvConfig.JWT_REFRESH_SECRET,
                    ) as {
                        email: string;
                        userId: string;
                        role: Role;
                    };

                    if (user) {
                        const accessToken = jwt.sign(
                            { email: user.email, userId: user.userId, role: user.role },
                            DotEnvConfig.JWT_SECRET,
                            {
                                expiresIn: '1h',
                            },
                        );
                        return res.json({
                            status: 'TOKEN_UPDATED',
                            accessToken,
                            userId: user.userId,
                        });
                    }
                } catch (err: any) {
                    const e = err as JsonWebTokenError;
                    console.log('error occured', err);
                    if (e.name === 'TokenExpiredError') {
                        res.clearCookie('nrccfresh');
                        return res.status(401).json({
                            message: messages.invalidAuth,
                            status: 'TOKEN_EXPIRED',
                            error: err.message,
                        });
                    } else {
                        return res.status(401).json({
                            message: messages.invalidAuth,
                            error: err.message,
                        });
                    }
                }
            } else
                return res
                    .status(401)
                    .json({ message: messages.invalidAuth, status: 'TOKEN_NOT_FOUND' });
        }

        const userExists = User.findOne({ where: { email: user?.email } });
        // ensure user exist on db.
        if (!userExists) {
            throw AppError.notFound('User does not exist');
        }

        if (user) {
            (req as any).user = user;
            next();
        } else {
            res.status(401).json({
                message: messages.invalidAuth,
            });
        }
    };
}
