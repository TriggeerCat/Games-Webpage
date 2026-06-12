import { IPlayer } from "./player.types";

export interface IRoom {
    code: string;
    hostId: IPlayer;
    playersId: IPlayer[];
    isGameStillOn: boolean;
    maxPlayers: number;
}
