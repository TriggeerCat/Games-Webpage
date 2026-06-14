import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";

import { VllProvider } from "../../../../../providers/vll.provider";

export const Route = createFileRoute(
    "/room/room/$roomCode/game/very-loud-librarians"
)({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <VllProvider>
            <Outlet />
        </VllProvider>
    );
}
