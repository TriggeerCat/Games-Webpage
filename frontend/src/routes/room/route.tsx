import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";

import { RoomProvider } from "../../providers/room.provider";

export const Route = createFileRoute("/room")({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <RoomProvider>
            <Outlet />
        </RoomProvider>
    );
}
