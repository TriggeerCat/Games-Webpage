import { GamesEnum } from "../../enums/games.enum";

export interface IRoom {
    code: string;
    hostId: string;
    playersId: string[];
    maxPlayers: number;
    isGameStillOn: boolean;
    game: GamesEnum;
}
