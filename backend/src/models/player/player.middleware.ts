import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../../enums/status-code.enum";
import { ApiError } from "../api/api.error";
import { playerService } from "./player.service";

class PlayerMiddleware {
    public async requirePlayer(req: Request, res: Response, next: NextFunction) {
        const id = req.cookies.playerId;
        if (!id) next(new ApiError("Invalid ID", STATUS_CODE.NOT_FOUND));

        const player = await playerService.findOneById(id);
        if (!player) next(new ApiError("Player not found", STATUS_CODE.NOT_FOUND));

        res.locals.player = player;

        next();
    }
}

export const playerMiddleware = new PlayerMiddleware();
