import { useEffect } from "react";

import { SOCKET_EVENTS } from "../constants/socket.constants";
import { useRoom } from "../providers/room.provider";
import { useTicTacToe } from "../providers/ttt.provider";
import { ITicTacToe } from "../types/tic-tac-toe.type";
import { socket } from "./socket";

export const useTicTackToeSocket = () => {
    const { refreshTTT } = useTicTacToe();
    const { room } = useRoom();
    const roomCode = room?.code || "";

    useEffect(() => {
        socket.emit(SOCKET_EVENTS.TTT_START_GAME, roomCode);

        socket.on(SOCKET_EVENTS.TTT_UPDATE_GAME, (game: ITicTacToe) => {
            refreshTTT(game);
        });

        return () => {
            socket.off(SOCKET_EVENTS.TTT_UPDATE_GAME, (game: ITicTacToe) => {
                refreshTTT(game);
            });
        };
    }, []);
};
