import { Router } from "express";

import { playerMiddleware } from "../player/player.middleware";
import { roomController } from "./room.controller";

const router = Router();

router.get("/", roomController.findAll);
router.get("/:code", roomController.findOneByCode);
router.post("/", playerMiddleware.requirePlayer, roomController.create);
router.patch("/transfer-host", roomController.transferHost);
router.patch("/add-player", roomController.addPlayer);
router.delete("/", roomController.delete);

export const roomRouter = router;
