import { STATUS_CODE } from "../../enums/status-code.enum";
import { ApiError } from "../api/api.error";
import { playerService } from "../player/player.service";
import { RoomModel } from "./room.model";
import { generateRoomCode } from "./room.utils";

class RoomService {
    public findAll() {
        return RoomModel.find().populate("hostId playersId");
    }

    public async findOneByCode(code: string) {
        const room = await RoomModel.findOne({ code }).populate(
            "hostId playersId"
        );
        if (!room) throw new ApiError("Room not found", STATUS_CODE.NOT_FOUND);
        return room;
    }

    public async create(hostId: string, maxPlayers: number) {
        while (true) {
            const code = generateRoomCode();
            if (!(await RoomModel.findOne({ code })))
                return await RoomModel.create({ code, hostId, maxPlayers });
        }
    }

    public async transferHost(code: string, hostId: string) {
        const host = await playerService.findOneById(hostId);
        if (!host)
            throw new ApiError(
                "Player not found (transfer host)",
                STATUS_CODE.NOT_FOUND
            );

        const room = await RoomModel.findOneAndUpdate(
            { code },
            { hostId },
            { returnDocument: "after" }
        ).populate("hostId playersId");
        if (!room)
            throw new ApiError(
                "Room not found (transfer host)",
                STATUS_CODE.NOT_FOUND
            );

        return room;
    }

    public async addPlayer(code: string, playerId: string) {
        const player = await playerService.findOneById(playerId);
        if (!player)
            throw new ApiError(
                "Player not found (add player)",
                STATUS_CODE.NOT_FOUND
            );

        const room = await RoomModel.findOneAndUpdate(
            { code },
            { $addToSet: { playersId: player._id } },
            { returnDocument: "after" }
        ).populate("hostId playersId");

        if (!room)
            throw new ApiError(
                "Room not found (add player)",
                STATUS_CODE.NOT_FOUND
            );
        return room;
    }

    public async delete(code: string) {
        const room = await RoomModel.findOneAndDelete({ code }).populate(
            "hostId playersId"
        );
        if (!room)
            throw new ApiError(
                "Room not found (delete)",
                STATUS_CODE.NOT_FOUND
            );
        return room;
    }
}

export const roomService = new RoomService();
