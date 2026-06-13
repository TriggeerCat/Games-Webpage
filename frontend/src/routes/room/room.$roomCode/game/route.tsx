import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { LobbyActive } from "../../../../components/room/LobbyActive";

export const Route = createFileRoute("/room/room/$roomCode/game")({
    component: RouteComponent
});

function RouteComponent() {
    return <LobbyActive />;
}
