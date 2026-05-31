import { Router } from "express";

import { playerMiddleware } from "../player/player.middleware";
import { roomController } from "./room.controller";

const router = Router();

router.get("/", roomController.findAll);
router.get("/:code", roomController.findOneByCode);
router.post("/", playerMiddleware.requirePlayer, roomController.create);
router.patch("/", roomController.updateHost); // TODO
router.delete("/:id", roomController.delete);
//addPlayer

export const roomRouter = router;
