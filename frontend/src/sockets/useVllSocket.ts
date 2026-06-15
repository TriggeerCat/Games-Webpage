import { useEffect } from "react";

import { SOCKET_EVENTS } from "../constants/socket.constants";
import { useRoom } from "../providers/room.provider";
import { useVll } from "../providers/vll.provider";
import { IVll } from "../types/vll.type";
import { socket } from "./socket";

export const useVllSocket = () => {
    const { refreshVll } = useVll();
    const { room } = useRoom();
    const roomCode = room?.code || "";

    useEffect(() => {
        socket.emit(SOCKET_EVENTS.VLL_START_ROUND, roomCode);

        socket.on(SOCKET_EVENTS.VLL_UPDATE_GAME, (game: IVll) => {
            refreshVll(game);
        });

        return () => {
            socket.off(SOCKET_EVENTS.VLL_UPDATE_GAME, (game: IVll) => {
                refreshVll(game);
            });
        };
    }, []);
};
