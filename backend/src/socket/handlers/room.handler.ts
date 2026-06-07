import { Server, Socket } from "socket.io";

import { roomService } from "../../models/room/room.service";

export const joinRoomHandler = (io: Server, socket: Socket) => {
    socket.on("join-room", async (roomCode: string) => {
        try {
            const { playerId } = socket.data.socketDataState;
            await roomService.findOneByCode(roomCode);
            socket.join(roomCode);
            const room = await roomService.addPlayer(roomCode, playerId);
            socket.data.socketDataState = { playerId, roomCode };
            io.to(roomCode).emit("update-room", room);
        } catch (e) {
            io.to(roomCode).emit("error", e);
        }
    });
};

const removePlayerFromRoom = async (io: Server, socket: Socket) => {
    const { playerId, roomCode } = socket.data.socketDataState;
    if (!playerId || !roomCode) return;
    try {
        const room = await roomService.deletePlayer(roomCode, playerId);
        socket.leave(roomCode);
        io.to(roomCode).emit("update-room", room);
    } catch (e) {
        io.to(roomCode).emit("error", e);
    }
};

export const leaveRoomHandler = (io: Server, socket: Socket) => {
    socket.on("leave-room", async () => {
        await removePlayerFromRoom(io, socket);
    });
};

export const disconnectFromRoomHandler = (io: Server, socket: Socket) => {
    socket.on("disconnect", async () => {
        await removePlayerFromRoom(io, socket);
    });
};

export const changeGameStatusHandler = (io: Server, socket: Socket) => {
    socket.on("change-game-status", async () => {
        const { playerId, roomCode } = socket.data.socketDataState;
        if (!playerId || !roomCode) return;
        try {
            if (!(await roomService.isPlayerHost(roomCode, playerId)))
                throw new Error("Player is not host");
            const room = await roomService.changeGameStatus(roomCode);
            io.to(roomCode).emit("update-room", room);
        } catch (e) {
            io.to(roomCode).emit("error", e);
        }
    });
};

export const sendMessageHandler = (io: Server, socket: Socket) => {
    socket.on("send-message", (roomCode: string, msg: string) => {
        try {
            io.to(roomCode).emit("chat-message", msg);
        } catch (e) {
            io.to(roomCode).emit("error", e);
        }
    });
};
