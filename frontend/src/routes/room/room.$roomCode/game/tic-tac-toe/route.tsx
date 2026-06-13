import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";

import { TicTakToeProvider } from "../../../../../providers/ttt.provider";

export const Route = createFileRoute("/room/room/$roomCode/game/tic-tac-toe")({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <TicTakToeProvider>
            <Outlet />
        </TicTakToeProvider>
    );
}
