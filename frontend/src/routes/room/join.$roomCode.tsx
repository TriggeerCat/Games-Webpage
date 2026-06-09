import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/room/join/$roomCode")({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello &#34;/room/join/$roomCode&#34;!</div>;
}
