import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { LobbyInactive } from "../../../components/room/LobbyInactive";

export const Route = createFileRoute("/room/room/$roomCode/")({
    component: RouteComponent
});

function RouteComponent() {
    return <LobbyInactive />;
}
