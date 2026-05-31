import { Router } from "express";

import { playerController } from "./player.controller";
import { playerMiddleware } from "./player.middleware";

const router = Router();

router.get("/", playerController.findAll);
router.get("/me", playerMiddleware.requirePlayer, playerController.findMe);
router.get("/id/:id", playerController.findOneById);
router.get("/:nickname", playerController.findManyByNickname);
router.post("/", playerController.create);
router.delete("/:id", playerController.delete);

export const playerRouter = router;
