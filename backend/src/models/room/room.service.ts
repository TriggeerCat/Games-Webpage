import { STATUS_CODE } from "../../enums/status-code.enum";
import { ApiError } from "../api/api.error";
import { IPlayer } from "../player/player.inteface";
import { generateRoomCode } from "./helpers/room.code_generator";
import { RoomModel } from "./room.model";

class RoomService {
    public findAll() {
        return RoomModel.find();
    }

    public async findOneByCode(code: string) {
        const room = await RoomModel.findOne({ code });
        if (!room) throw new ApiError("Room not found", STATUS_CODE.NOT_FOUND);
        return room;
    }

    public async create(host: IPlayer, maxPlayers: number) {
        while (true) {
            const code = generateRoomCode();
            if (!(await RoomModel.findOne({ code }))) return await RoomModel.create({ code, host, maxPlayers });
        }
    }

    public async updateHost(code: string, host: IPlayer) {
        const room = await RoomModel.updateOne({ code }, { host });
        if (room) throw new ApiError("Room not found", STATUS_CODE.NOT_FOUND);
        return room;
    }

    public async delete(code: string) {
        const room = await RoomModel.deleteOne({ code });
        if (room) throw new ApiError("Room not found", STATUS_CODE.NOT_FOUND);
        return room;
    }
}

export const roomService = new RoomService();
