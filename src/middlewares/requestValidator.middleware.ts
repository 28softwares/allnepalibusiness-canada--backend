import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ObjectInterface } from "../interfaces/objectInterface";
import { AppError } from "../utils/appError.util";
import { catchAsync } from "../utils/catchAsync.util";

const validatorDto = <T extends ClassConstructor<any>>(obj: T) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const validatorDto = async <T extends ClassConstructor<any>>(
      dto: T,
      obj: ObjectInterface
    ) => {
      try {
        const objInstance = plainToInstance(dto, obj);
        const errors = await validate(objInstance, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });
        const messages: string[] = [];
        if (errors.length) {
          const nestedValidationError = errors[0].children;
          if (nestedValidationError?.length) {
            const validationErrors = nestedValidationError[0].constraints;
            if (validationErrors) {
              const keys = Object.keys(validationErrors)[0];
              messages.push(validationErrors[keys]);
            }
          }
          const plainValidationError = errors[0].constraints;
          if (plainValidationError) {
            const keys = Object.keys(plainValidationError)[0];
            messages.push(plainValidationError[keys]);
          }
          if (messages.length) {
            console.log("messages", messages);
            throw next(AppError.badRequest(messages[0]));
          }
        }
        return next();
      } catch (error) {
        return next(error);
      }
    };
    validatorDto(obj, req.body);
  });
};

export default validatorDto;
