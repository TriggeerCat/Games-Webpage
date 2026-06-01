import { model, Schema } from "mongoose";

import { IRoom } from "./room.interface";

const roomSchema = new Schema(
    {
        code: { type: String, required: true, unique: true },
        hostId: { type: Schema.Types.ObjectId, ref: "Player", required: true },
        playersId: [
            { type: Schema.Types.ObjectId, ref: "Player", required: true }
        ],
        isGameStillOn: { type: Boolean, default: false },
        maxPlayers: { type: Number, required: true }
    },
    { versionKey: false }
);

export const RoomModel = model<IRoom>("room", roomSchema);
