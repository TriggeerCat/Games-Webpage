import { PlayerDocument } from "../models/player/player.model";

declare global {
    namespace Express {
        interface Request {
            player?: PlayerDocument;
        }
    }
}
