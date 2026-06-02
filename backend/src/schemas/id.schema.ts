import { Types } from "mongoose";
import z from "zod";

export const idSchema = (key: string) =>
    z.object({
        [key]: z.string().refine(Types.ObjectId.isValid, "Invalid id")
    });
