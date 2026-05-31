import { STATUS_CODE } from "../../enums/status-code.enum";
import { ApiError } from "../api/api.error";
import { PlayerModel } from "./player.model";

class PlayerService {
    public findAll() {
        return PlayerModel.find();
    }

    public async findOneById(_id: string) {
        const player = await PlayerModel.findById(_id);
        if (!player) throw new ApiError("Player not found (one by id)", STATUS_CODE.NOT_FOUND);
        return player;
    }

    public async findManyByNickname(nickname: string) {
        const player = await PlayerModel.find({ nickname });
        if (!player) throw new ApiError("Player not found (many by nickname)", STATUS_CODE.NOT_FOUND);
        return player;
    }

    public create(nickname: string) {
        return PlayerModel.create({ nickname });
    }

    public async delete(_id: string) {
        const player = await PlayerModel.findByIdAndDelete(_id);
        if (!player) throw new ApiError("Player not found (delete)", STATUS_CODE.NOT_FOUND);
        return player;
    }
}

export const playerService = new PlayerService();
