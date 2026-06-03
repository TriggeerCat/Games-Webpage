import { Router } from "express";

import { idSchema } from "../../schemas/id.schema";
import { playerSchema } from "../../schemas/player.schema";
import { schemaMiddleware } from "../../schemas/schema.middleware";
import { playerController } from "./player.controller";
import { playerMiddleware } from "./player.middleware";

const router = Router();

router.get("/", playerController.findAll);
router.get("/me", playerMiddleware.requirePlayer, playerController.findMe);
router.get("/nickname/:nickname", playerController.findManyByNickname);
router.get(
    "/id/:_id",
    schemaMiddleware.validate(idSchema("_id"), "params"),
    playerController.findOneById
);

router.post(
    "/",
    schemaMiddleware.validate(playerSchema, "body"),
    playerController.create
);

router.patch(
    "/",
    schemaMiddleware.validate(playerSchema, "body"),
    playerMiddleware.requirePlayer,
    playerController.changeNickname
);

router.delete(
    "/:_id",
    schemaMiddleware.validate(idSchema("_id"), "params"),
    playerController.delete
);

export const playerRouter = router;
