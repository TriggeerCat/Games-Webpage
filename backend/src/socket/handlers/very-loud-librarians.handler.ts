import { Server, Socket } from "socket.io";

import { VllBoardState } from "../../models/games/very-loud-librarians/vll.state";
import { onSafe } from "../on-save.wrapper";

class VeryLoudLibrariansHandler {
    private readonly games = new Map<string, VllBoardState>();

    private getGame(roomCode: string) {
        if (!this.games.has(roomCode)) {
            this.games.set(roomCode, new VllBoardState());
        }

        return this.games.get(roomCode)!;
    }

    public startRoundHandler(io: Server, socket: Socket) {
        onSafe(socket, "vll:start-round", (roomCode: string) => {
            const game = this.getGame(roomCode);
            game.startRound();
            game.drawCard("category");
            io.to(roomCode).emit("vll:update-game", game.getState());

            setTimeout(() => {
                game.endRound();
                io.to(roomCode).emit("vll:update-game", game.getState());
            }, 60_000);
        });
    }

    public scorePointHandler(io: Server, socket: Socket) {
        onSafe(
            socket,
            "vll:score-point",
            ({ point, roomCode }: { point: number; roomCode: string }) => {
                const game = this.getGame(roomCode);

                switch (point) {
                    case 1:
                    case -1:
                        game.drawCard("letter");
                        game.scorePoints(point);
                        break;
                    case 2:
                        game.drawCard("category");
                        game.scorePoints(point);
                        break;
                }
                io.to(roomCode).emit("vll:update-game", game.getState());
            }
        );
    }
}

export const vllHandler = new VeryLoudLibrariansHandler();
