import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../../enums/status-code.enum";
import { ApiError } from "../api/api.error";
import { IPlayer } from "./player.inteface";
import { playerService } from "./player.service";

class PlayerController {
    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await playerService.findAll();
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async findOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await playerService.findOneById(
                req.params.id as string
            );
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async findManyByNickname(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await playerService.findManyByNickname(
                req.params.nickname as string
            );
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async findMe(req: Request, res: Response, next: NextFunction) {
        try {
            const data = res.locals.player as IPlayer;
            if (!data)
                next(
                    new ApiError("Player not found (me)", STATUS_CODE.NOT_FOUND)
                );
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await playerService.create(
                req.body.nickname as string
            );
            res.cookie("playerId", data._id, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24
            });

            res.status(STATUS_CODE.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await playerService.delete(req.params.id as string);
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const playerController = new PlayerController();
