import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { SOCKET_EVENTS } from "../constants/socket.constants";
import { useMe } from "../providers/me.provider";
import { useRoom } from "../providers/room.provider";
import { IRoom } from "../types/room.type";
import { socket } from "./socket";

export const useRoomSocket = () => {
    const { room, setRoom } = useRoom();
    const { me } = useMe();
    const roomCode = room?.code || "";
    const navigate = useNavigate();

    useEffect(() => {
        socket.emit(SOCKET_EVENTS.JOIN_ROOM, roomCode);

        socket.on(SOCKET_EVENTS.UPDATE_ROOM, (room: IRoom) => {
            setRoom(room);
        });

        socket.on(SOCKET_EVENTS.KICKED_OUT, async (id: string) => {
            if (me?._id === id) await navigate({ to: "/" });
        });

        socket.on(
            SOCKET_EVENTS.START_MOVING,
            async (roomCode: string, gameId: string) => {
                await navigate({
                    to: `/room/room/${roomCode}/game/${gameId}`
                });
            }
        );

        return () => {
            socket.off(SOCKET_EVENTS.UPDATE_ROOM, (room: IRoom) => {
                setRoom(room);
            });

            socket.off(SOCKET_EVENTS.KICKED_OUT, async (id: string) => {
                if (me?._id === id) await navigate({ to: "/" });
            });
        };
    }, [roomCode]);
};
