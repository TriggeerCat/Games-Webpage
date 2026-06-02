import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { fromZodError } from "zod-validation-error";

import { STATUS_CODE } from "../enums/status-code.enum";
import { ApiError } from "../models/api/api.error";

class SchemaMiddleware {
    public validateParams(zodObject: ZodObject) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const result = zodObject.safeParse(req.params);
            if (!result.success) {
                next(
                    new ApiError(
                        fromZodError(result.error).message,
                        STATUS_CODE.BAD_REQUEST
                    )
                );
            }
            next();
        };
    }

    public validateBody(zodObject: ZodObject) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const result = zodObject.safeParse(req.body);
            if (!result.success) {
                next(
                    new ApiError(
                        fromZodError(result.error).message,
                        STATUS_CODE.BAD_REQUEST
                    )
                );
            }
            next();
        };
    }
}

export const schemaMiddleware = new SchemaMiddleware();
