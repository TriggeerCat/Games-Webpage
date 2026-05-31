import { IPlayer } from "../player/player.inteface";

export interface IRoom {
    code: string;
    host: IPlayer;
    players: IPlayer[];
    isGameStillOn: boolean;
    maxPlayers: number;
}
