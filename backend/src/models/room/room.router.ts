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
    schemaMiddleware.validateParams(roomCodeSchema),
    roomController.findOneByCode
);

router.post(
    "/",
    schemaMiddleware.validateBody(roomMaxPlayersSchema),
    playerMiddleware.requirePlayer,
    roomController.create
);
router.post(
    "/:code/players",
    schemaMiddleware.validateParams(roomCodeSchema),
    schemaMiddleware.validateBody(idSchema("playerId")),
    roomController.addPlayer
);

router.patch(
    "/:code/players/transfer-host",
    schemaMiddleware.validateParams(roomCodeSchema),
    schemaMiddleware.validateBody(idSchema("hostId")),
    playerMiddleware.requirePlayer,
    roomController.transferHost
);

router.delete(
    "/:code",
    schemaMiddleware.validateParams(roomCodeSchema),
    roomController.delete
);
router.delete(
    "/:code/players",
    schemaMiddleware.validateParams(roomCodeSchema),
    schemaMiddleware.validateBody(idSchema("playerId")),
    roomController.deletePlayer
);

export const roomRouter = router;
