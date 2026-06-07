import { Server as HttpServer } from "node:http";

import { Server as SocketIOServer } from "socket.io";

import envData from "../env/env";
import { playerService } from "../models/player/player.service";
import {
    changeGameStatusHandler,
    disconnectFromRoomHandler,
    joinRoomHandler,
    leaveRoomHandler,
    sendMessageHandler
} from "./handlers/room.handler";

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
        joinRoomHandler(io, socket);
        leaveRoomHandler(io, socket);
        disconnectFromRoomHandler(io, socket);
        changeGameStatusHandler(io, socket);
        sendMessageHandler(io, socket);
    });
};
