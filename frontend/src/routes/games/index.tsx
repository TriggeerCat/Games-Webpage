import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/games/")({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello &#34;/games/&#34;!</div>;
}
