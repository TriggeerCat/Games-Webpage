import { Router } from "express";

import { idSchema } from "../../schemas/id.schema";
import {
    roomCodeSchema,
    roomMaxPlayersSchema
} from "../../schemas/room.schema";
import { schemaMiddleware } from "../../schemas/schema.middleware";
import { playerMiddleware } from "../player/player.middleware";
import { roomController } from "./room.controller";

const router = Router();

router.get("/", roomController.findAll);
router.get(
    "/:code",
    schemaMiddleware.validate(roomCodeSchema, "params"),
    roomController.findOneByCode
);

router.post(
    "/",
    schemaMiddleware.validate(roomMaxPlayersSchema, "body"),
    playerMiddleware.requirePlayer,
    roomController.create
);
router.post(
    "/:code/players",
    schemaMiddleware.validate(roomCodeSchema, "params"),
    schemaMiddleware.validate(idSchema("playerId"), "body"),
    roomController.addPlayer
);

router.patch(
    "/:code/players/transfer-host",
    schemaMiddleware.validate(roomCodeSchema, "params"),
    schemaMiddleware.validate(idSchema("hostId"), "body"),
    playerMiddleware.requirePlayer,
    roomController.transferHost
);

router.delete(
    "/:code",
    schemaMiddleware.validate(roomCodeSchema, "params"),
    roomController.delete
);
router.delete(
    "/:code/players",
    schemaMiddleware.validate(roomCodeSchema, "params"),
    schemaMiddleware.validate(idSchema("playerId"), "body"),
    roomController.deletePlayer
);

export const roomRouter = router;
