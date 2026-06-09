import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../../enums/status-code.enum";
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

    public async findOneByCode(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await roomService.findOneByCode(
                req.params.code as string
            );
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await roomService.create(
                res.locals.player._id,
                req.body.maxPlayers as number
            );
            res.status(STATUS_CODE.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async transferHost(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await roomService.transferHost(
                req.params.code as string,
                req.body.hostId as string
            );
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async addPlayer(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await roomService.addPlayer(
                req.params.code as string,
                req.body.playerId as string
            );
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

    public async deletePlayer(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await roomService.deletePlayer(
                req.params.code as string,
                req.body.playerId as string
            );
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const roomController = new RoomController();
