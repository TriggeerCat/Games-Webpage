import { Router } from "express";

import { playerRouter } from "../player/player.router";
import { roomRouter } from "../room/room.router";

const router = Router();

router.use("/player", playerRouter);
router.use("/room", roomRouter);

export const apiRouter = router;
