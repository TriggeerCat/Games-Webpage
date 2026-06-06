import { Server, Socket } from "socket.io";

import { roomService } from "../../models/room/room.service";

export const removePlayerFromRoom = async (io: Server, socket: Socket) => {
    const { playerId, roomCode } = socket.data;
    socket.leave(roomCode);
    const room = await roomService.deletePlayer(roomCode, playerId);
    io.to(roomCode).emit("update-room", room);
};

export const joinRoomHandler = async (io: Server, socket: Socket) => {
    socket.on("join-room", async () => {
        const { playerId, roomCode } = socket.data;
        await roomService.findOneByCode(roomCode);
        socket.join(roomCode);
        const room = await roomService.addPlayer(roomCode, playerId);
        socket.data.playerId = playerId;
        socket.data.roomCode = roomCode;
        io.to(roomCode).emit("update-room", room);
    });
};

export const disconnectFromRoomHandler = async (io: Server, socket: Socket) => {
    socket.on("disconnect", async () => {
        const { playerId, roomCode } = socket.data;
        if (!playerId || !roomCode) return;
        await roomService.findOneByCode(roomCode);
        await removePlayerFromRoom(io, socket);
    });
};

export const startGameHandler = async (io: Server, socket: Socket) => {
    socket.on("start-game", async (roomCode: string) => {
        const room = await roomService.changeGameStatus(roomCode);
        io.to(roomCode).emit("update-room", room);
    });
};

export const sendMessageHandler = async (io: Server, socket: Socket) => {
    socket.on("send-message", (roomCode: string, msg: string) => {
        io.to(roomCode).emit(msg);
    });
};
