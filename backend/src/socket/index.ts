import { Server as HttpServer } from "node:http";

import { Server as SocketIOServer } from "socket.io";

import envData from "../env/env";
import { playerService } from "../models/player/player.service";
import { roomHandler } from "./handlers/room.handler";
import { ticTacToeHandler } from "./handlers/tic-tac-toe.handler";

export const addSocket = (httpServer: HttpServer) => {
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: envData.FRONTEND_URL
        }
    });

    io.use(async (socket, next) => {
        try {
            const playerId: string = socket.handshake.auth.playerId;
            if (!playerId) socket.disconnect();
            await playerService.findOneById(playerId);
            socket.data.socketDataState = { playerId };
            next();
        } catch {
            socket.disconnect();
        }
    });

    io.on("connection", (socket) => {
        roomHandler.joinRoomHandler(io, socket);
        roomHandler.leaveRoomHandler(io, socket);
        roomHandler.disconnectFromRoomHandler(io, socket);
        roomHandler.kickAnotherFromRoomHandler(io, socket);
        roomHandler.transferHostHandler(io, socket);
        roomHandler.changeGameStatusHandler(io, socket);
        roomHandler.selectGameHandler(io, socket);

        ticTacToeHandler.startTheGameHandler(io, socket);
        ticTacToeHandler.placeSignHandler(io, socket);
    });
};
