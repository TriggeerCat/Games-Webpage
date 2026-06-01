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
                return await RoomModel.create({
                    code,
                    hostId,
                    maxPlayers,
                    playersId: [hostId]
                });
        }
    }

    public async transferHost(
        code: string,
        currentHostId: string,
        newHostId: string
    ) {
        const room = await RoomModel.findOne({ code });
        if (!room)
            throw new ApiError(
                "Room not found (transfer host)",
                STATUS_CODE.NOT_FOUND
            );

        const isPlayerInRoom = room.playersId.includes(newHostId);
        const newHost = await playerService.findOneById(newHostId);
        if (!isPlayerInRoom || !newHost)
            throw new ApiError(
                "Player not found (transfer host)",
                STATUS_CODE.NOT_FOUND
            );

        // disabled for debugging purposes
        // if (room.hostId.toString() !== currentHostId.toString()) {
        //     throw new ApiError(
        //         "Thou art not host (transfer host)",
        //         STATUS_CODE.FORBIDDEN
        //     );
        // }

        const newRoom = await RoomModel.findOneAndUpdate(
            { code },
            { hostId: newHostId },
            { returnDocument: "after" }
        ).populate("hostId playersId");

        return newRoom;
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

    public async deletePlayer(code: string, playerId: string) {
        const room = await RoomModel.findOne({ code });

        if (!room) {
            throw new ApiError(
                "Room not found (delete player)",
                STATUS_CODE.NOT_FOUND
            );
        }

        if (room.hostId.toString() === playerId)
            throw new ApiError(
                "You can't delete the host (delete player)",
                STATUS_CODE.NOT_FOUND
            );

        const player = await playerService.findOneById(playerId);

        const newRoom = await RoomModel.findOneAndUpdate(
            { code },
            { $pull: { playersId: player._id } },
            { returnDocument: "after" }
        ).populate("hostId playersId");

        return newRoom;
    }
}

export const roomService = new RoomService();
