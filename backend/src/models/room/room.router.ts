import { Router } from "express";

import { playerMiddleware } from "../player/player.middleware";
import { roomController } from "./room.controller";

const router = Router();

router.get("/", roomController.findAll);
router.get("/:code", roomController.findOneByCode);

router.post("/", playerMiddleware.requirePlayer, roomController.create);
router.post("/:code/players", roomController.addPlayer);

router.patch(
    "/:code/players/transfer-host",
    playerMiddleware.requirePlayer,
    roomController.transferHost
);

router.delete("/:code", roomController.delete);
router.delete("/:code/players", roomController.deletePlayer);

export const roomRouter = router;
