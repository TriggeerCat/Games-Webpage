import { model, Schema } from "mongoose";

import { GAMES_LIST } from "../../enums/games.enum";
import { IRoom } from "./room.types";

const roomSchema = new Schema(
    {
        code: { type: String, required: true, unique: true },
        hostId: { type: Schema.Types.ObjectId, ref: "Player", required: true },
        playersId: [
            { type: Schema.Types.ObjectId, ref: "Player", required: true }
        ],
        isGameStillOn: { type: Boolean, default: false },
        maxPlayers: { type: Number, required: true },
        game: {
            type: String,
            enum: Object.values(GAMES_LIST),
            default: null
        }
    },
    { versionKey: false }
);

export const RoomModel = model<IRoom>("room", roomSchema);
