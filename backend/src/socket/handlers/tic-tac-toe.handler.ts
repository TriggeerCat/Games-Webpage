import { Server, Socket } from "socket.io";

import { TTTBoardState } from "../../models/games/tic-tac-toe/ttt.state";
import { onSafe } from "../on-save.wrapper";

class TicTacToeHandler {
    private readonly games = new Map<string, TTTBoardState>();

    private getGame(roomCode: string) {
        if (!this.games.has(roomCode)) {
            this.games.set(roomCode, new TTTBoardState());
        }

        return this.games.get(roomCode)!;
    }

    public startTheGameHandler = (io: Server, socket: Socket) => {
        onSafe(socket, "ttt:start-game", (roomCode: string) => {
            const game = this.getGame(roomCode);
            io.to(roomCode).emit("ttt:update-game", game.getState());
        });
    };

    public placeSignHandler = (io: Server, socket: Socket) => {
        onSafe(
            socket,
            "ttt:place-sign",
            ({
                roomCode,
                position,
                sign
            }: {
                roomCode: string;
                position: number;
                sign: "X" | "O" | null;
            }) => {
                if (!sign) return;
                const game = this.getGame(roomCode);
                game.placeSign(position, sign);
                io.to(roomCode).emit("ttt:update-game", game.getState());
            }
        );
    };
}

export const ticTacToeHandler = new TicTacToeHandler();
