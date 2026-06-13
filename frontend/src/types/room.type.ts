import { IPlayer } from "./player.type";

export interface IRoom {
    code: string;
    hostId: IPlayer;
    playersId: IPlayer[];
    isGameStillOn: boolean;
    maxPlayers: number;
}
