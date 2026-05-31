import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../../enums/status-code.enum";
import { IPlayer } from "../player/player.inteface";
import { roomService } from "./room.service";

class RoomController {
    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await roomService.findAll();
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async findOneByCode(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await roomService.findOneByCode(req.params.code as string);
            res.status(STATUS_CODE.NO_CONTENT).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await roomService.create(res.locals.player as IPlayer, req.body.maxPlayers);
            res.status(STATUS_CODE.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateHost(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await roomService.updateHost(req.params.code as string, req.body.host as IPlayer);
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await roomService.delete(req.params.code as string);
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const roomController = new RoomController();
