import { Server, Socket } from "socket.io";

import { roomService } from "../../models/room/room.service";
import { onSafe } from "../on-save.wrapper";

export const joinRoomHandler = (io: Server, socket: Socket) => {
    onSafe(socket, "join-room", async (roomCode: string) => {
        const { playerId } = socket.data.socketDataState;
        await roomService.findOneByCode(roomCode);
        socket.join(roomCode);
        const room = await roomService.addPlayer(roomCode, playerId);
        socket.data.socketDataState = { playerId, roomCode };
        io.to(roomCode).emit("update-room", room, "join room");
    });
};

const removePlayerFromRoom = async (io: Server, socket: Socket) => {
    const { playerId, roomCode } = socket.data.socketDataState;
    if (!playerId || !roomCode) return;
    const room = await roomService.findOneByCode(roomCode);

    if (!(await roomService.isPlayerHost(roomCode, playerId))) {
        const newRoom = await roomService.deletePlayer(roomCode, playerId);
        io.to(roomCode).emit("update-room", newRoom, "guy isn't host");
        socket.leave(roomCode); // change order of leave and emit in final version
        return;
    }

    // If host disconnects from this particular room then not delete the host and not delete the room
    if (roomCode === "ELI4W0") {
        io.to(roomCode).emit("update-room", room, "room is special");
        return;
    }

    if (room.playersId.length > 1) {
        const otherPlayersList = await roomService.getPlayersIdList(roomCode);
        const hostIndex = otherPlayersList.indexOf(playerId);
        otherPlayersList.splice(hostIndex, 1);

        const num = Math.floor(Math.random() * otherPlayersList.length);
        const newHostId = otherPlayersList[num];
        await roomService.transferHost(roomCode, newHostId);
        const newRoom = await roomService.deletePlayer(roomCode, playerId);
        io.to(roomCode).emit("update-room", newRoom, "transfer random host");
        socket.leave(roomCode); // change order of leave and emit in final version
        return;
    }

    socket.leave(roomCode);
    await roomService.delete(roomCode);
};

export const leaveRoomHandler = (io: Server, socket: Socket) => {
    onSafe(socket, "leave-room", async () => {
        await removePlayerFromRoom(io, socket);
    });
};

export const disconnectFromRoomHandler = (io: Server, socket: Socket) => {
    onSafe(socket, "disconnect", async () => {
        await removePlayerFromRoom(io, socket);
    });
};

export const changeGameStatusHandler = (io: Server, socket: Socket) => {
    onSafe(socket, "change-game-status", async () => {
        const { playerId, roomCode } = socket.data.socketDataState;
        if (!playerId || !roomCode) return;
        if (!(await roomService.isPlayerHost(roomCode, playerId)))
            throw new Error("Player is not host");
        const room = await roomService.changeGameStatus(roomCode);
        io.to(roomCode).emit("update-room", room, "change status");
    });
};

export const sendMessageHandler = (io: Server, socket: Socket) => {
    onSafe(socket, "send-message", (roomCode: string, msg: string) => {
        io.to(roomCode).emit("chat-message", msg);
    });
};

export const debugCreateRoom = (io: Server, socket: Socket) => {
    onSafe(socket, "debug-create-room", (hostId: string) => {
        const room = roomService.create(hostId, 2, "TEST01");
        io.emit("update-room", room);
    });
};
