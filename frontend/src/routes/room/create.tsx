import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/room/create")({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello &#34;/room/create&#34;!</div>;
}
