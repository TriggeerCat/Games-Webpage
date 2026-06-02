import z from "zod";

export const playerSchema = z.object({
    nickname: z
        .string()
        .trim()
        .min(2, "Nickname is too short")
        .max(20, "Nickname is too long")
});
