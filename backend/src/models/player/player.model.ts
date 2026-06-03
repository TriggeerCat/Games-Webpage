import { model, Schema } from "mongoose";

import { IPlayer } from "./player.types";

const playerSchema = new Schema(
    {
        nickname: { type: String, required: true }
    },
    { timestamps: true, versionKey: false }
);

export const PlayerModel = model<IPlayer>("Player", playerSchema);
