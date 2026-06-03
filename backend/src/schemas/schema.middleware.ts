import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { fromZodError } from "zod-validation-error";

import { STATUS_CODE } from "../enums/status-code.enum";
import { ApiError } from "../models/api/api.error";

class SchemaMiddleware {
    public validate(zodObject: ZodObject, target: "body" | "params" | "query") {
        return async (req: Request, res: Response, next: NextFunction) => {
            const result = zodObject.safeParse(req[target]);
            if (!result.success) {
                return next(
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
