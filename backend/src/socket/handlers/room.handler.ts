import { Server, Socket } from "socket.io";

import { GamesEnum } from "../../enums/games.enum";
import { roomService } from "../../models/room/room.service";
import { onSafe } from "../on-save.wrapper";

class RoomHandler {
    private readonly removePlayerFromRoom = async (
        io: Server,
        socket: Socket
    ) => {
        const { playerId, roomCode } = socket.data.socketDataState;
        if (!playerId || !roomCode) return;
        const room = await roomService.findOneByCode(roomCode);

        if (!(await roomService.isPlayerHost(roomCode, playerId))) {
            const newRoom = await roomService.deletePlayer(roomCode, playerId);
            socket.leave(roomCode);
            io.to(roomCode).emit("update-room", newRoom, "guy isn't host");
            return;
        }

        // If host disconnects from this particular room then not delete the host and not delete the room
        if (roomCode === "ELI4W0") {
            io.to(roomCode).emit("update-room", room, "room is special");
            return;
        }

        if (room.playersId.length > 1) {
            const otherPlayersList =
                await roomService.getPlayersIdList(roomCode);
            const hostIndex = otherPlayersList.indexOf(playerId);
            otherPlayersList.splice(hostIndex, 1);

            const num = Math.floor(Math.random() * otherPlayersList.length);
            const newHostId = otherPlayersList[num];
            await roomService.transferHost(roomCode, newHostId);
            const newRoom = await roomService.deletePlayer(roomCode, playerId);
            socket.leave(roomCode);
            io.to(roomCode).emit(
                "update-room",
                newRoom,
                "transfer random host"
            );
            return;
        }

        socket.leave(roomCode);
        await roomService.delete(roomCode);
    };

    public joinRoomHandler = (io: Server, socket: Socket) => {
        onSafe(socket, "join-room", async (roomCode: string) => {
            const { playerId } = socket.data.socketDataState;
            await roomService.findOneByCode(roomCode);
            socket.join(roomCode);
            const room = await roomService.addPlayer(roomCode, playerId);
            socket.data.socketDataState = { playerId, roomCode };
            io.to(roomCode).emit("update-room", room, "join room");
        });
    };

    public leaveRoomHandler = (io: Server, socket: Socket) => {
        onSafe(socket, "leave-room", async () => {
            await this.removePlayerFromRoom(io, socket);
        });
    };

    public disconnectFromRoomHandler = (io: Server, socket: Socket) => {
        onSafe(socket, "disconnect", async () => {
            await this.removePlayerFromRoom(io, socket);
        });
    };

    public kickAnotherFromRoomHandler = (io: Server, socket: Socket) => {
        onSafe(socket, "kick-player", async (badPlayerId: string) => {
            const { playerId, roomCode } = socket.data.socketDataState;
            if (!playerId || !roomCode) return;

            if (!(await roomService.isPlayerHost(roomCode, playerId)))
                throw new Error("Player is not host");

            const room = await roomService.deletePlayer(roomCode, badPlayerId);

            io.to(roomCode).emit("kicked-out", badPlayerId);
            io.to(roomCode).emit("update-room", room, "kick guy");
        });
    };

    public transferHostHandler = (io: Server, socket: Socket) => {
        onSafe(socket, "transfer-host", async (newHostId: string) => {
            const { playerId, roomCode } = socket.data.socketDataState;
            if (!playerId || !roomCode) return;

            if (!(await roomService.isPlayerHost(roomCode, playerId)))
                throw new Error("Player is not host");

            await roomService.transferHost(roomCode, newHostId);
            const newRoom = await roomService.findOneByCode(roomCode);
            io.to(roomCode).emit("update-room", newRoom, "transfer host");
        });
    };

    public changeGameStatusHandler = (io: Server, socket: Socket) => {
        onSafe(socket, "change-game-status", async () => {
            const { playerId, roomCode } = socket.data.socketDataState;
            if (!playerId || !roomCode) return;
            if (!(await roomService.isPlayerHost(roomCode, playerId)))
                throw new Error("Player is not host");
            const room = await roomService.changeGameStatus(roomCode);
            io.to(roomCode).emit("update-room", room, "change status");
        });
    };

    public selectGameHandler = (io: Server, socket: Socket) => {
        onSafe(socket, "select-game", async (gameId: GamesEnum | null) => {
            const { playerId, roomCode } = socket.data.socketDataState;
            if (!playerId || !roomCode) return;
            if (!(await roomService.isPlayerHost(roomCode, playerId)))
                throw new Error("Player is not host");
            const room = await roomService.selectGame(roomCode, gameId);

            io.to(roomCode).emit("update-room", room, "select game");
            io.to(roomCode).emit("start-moving", roomCode, gameId);
        });
    };
}

export const roomHandler = new RoomHandler();
