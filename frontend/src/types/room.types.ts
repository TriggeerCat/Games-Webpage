export interface IRoom {
    code: string;
    hostId: string;
    playersId: string[];
    isGameStillOn: boolean;
    maxPlayers: number;
}
