import { AppError } from '../utils/appError.util';
import { ValidateError } from 'tsoa';
import multer from 'multer';
import messages from '../constants/messages';
import { QueryFailedError } from 'typeorm';
import  {Request, Response, NextFunction} from "express";

const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    console.log('error', error);
    if (error instanceof AppError) {
        return res.status(+error?.statusCode || 400).json({
            success: false,
            message: error?.message ?? 'Something went wrong!',
            data: null,
        });
    }
    if (error instanceof ValidateError) {
        return res.status(400).json({
            message: 'Validation Failed',
            details: error?.fields,
        });
    }

    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            message: 'File Size Exceeded. Please upload within 8MB',
            details: error.message,
        });
    }

    if (error instanceof QueryFailedError) {
        return res.status(400).json({
            success: false,
            message: 'Database Query Error',
            data: null,
        });
    }

    return res.status(500).json({
        success: false,
        message: messages.serverError,
        data: null,
    });
};
export default errorHandler;
