import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";

import { ErrorPage } from "../../../pages/ErrorPage";
import { GameProvider } from "../../../providers/game.provider";
import { useRoom } from "../../../providers/room.provider";
import { SocketProvider } from "../../../providers/socket.provider";
import { useRoomSocket } from "../../../sockets/useRoomSocket";

export const Route = createFileRoute("/room/room/$roomCode")({
    component: RouteComponent
});

function RouteComponent() {
    const { room } = useRoom();

    useRoomSocket();

    if (room === undefined)
        return <div className="flex justify-center">Loading...</div>;

    return room ? (
        <GameProvider>
            <SocketProvider>
                <Outlet />
            </SocketProvider>
        </GameProvider>
    ) : (
        <ErrorPage />
    );
}
