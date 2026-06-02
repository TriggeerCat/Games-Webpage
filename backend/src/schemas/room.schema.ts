import z from "zod";

export interface IRoom {
    code: string;
    hostId: string;
    playersId: string[];
    isGameStillOn: boolean;
    maxPlayers: number;
}

export const roomCodeSchema = z.object({
    code: z.string().trim().length(6, "Code length must be 6")
});

export const roomMaxPlayersSchema = z.object({
    maxPlayers: z.number().min(1).max(8)
});
