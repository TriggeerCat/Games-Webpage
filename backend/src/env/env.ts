import dotenv from "dotenv";
import z from "zod";

import { STATUS_CODE } from "../enums/status-code.enum";
import { ApiError } from "../models/api/api.error";

dotenv.config();

const envSchema = z.object({
    // DB CONFIG
    MONGO_URI: z.url().optional().default(""),

    // SERVER CONFIG
    SERVER_PORT: z.coerce.number().int().min(1).max(65535).optional().default(12250)
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error("Environment variables validation failure:", z.treeifyError(env.error));
    throw new ApiError("Invalid environment variables", STATUS_CODE.BAD_REQUEST);
}

const envData = env.data;

export default envData;
