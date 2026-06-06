import { Server as HttpServer } from "node:http";

import { Server as SocketIOServer } from "socket.io";

import envData from "../env/env";
import {
    disconnectFromRoomHandler,
    joinRoomHandler,
    sendMessageHandler,
    startGameHandler
} from "./handlers/room.handler";

export const addSocket = (httpServer: HttpServer) => {
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: envData.FRONTEND_URL
        }
    });

    io.on("connection", (socket) => {
        joinRoomHandler(io, socket).then();
        disconnectFromRoomHandler(io, socket).then();
        startGameHandler(io, socket).then();
        sendMessageHandler(io, socket).then();
    });
};
