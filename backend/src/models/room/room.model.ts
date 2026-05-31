import { model, Schema } from "mongoose";

import { playerSchema } from "../player/player.model";
import { IRoom } from "./room.interface";

const roomSchema = new Schema(
    {
        code: { type: String, required: true, unique: true },
        host: { type: playerSchema, ref: "Player", required: true },
        players: [{ type: playerSchema, ref: "Player" }],
        isGameStillOn: { type: Boolean, default: false },
        maxPlayers: { type: Number, required: true }
    },
    { timestamps: true, versionKey: false }
);

export const RoomModel = model<IRoom>("room", roomSchema);
