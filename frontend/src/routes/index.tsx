import "../sockets/connection.socket";

import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { ButtonsLoggedIn } from "../components/root/ButtonsLoggedIn";
import { ButtonsLoggedOut } from "../components/root/ButtonsLoggedOut";
import { useMe } from "../providers/me.provider";

export const Route = createFileRoute("/")({
    component: RouteComponent
});

function RouteComponent() {
    const { me } = useMe();

    return (
        <div className="flex flex-col items-center gap-10 mt-60">
            <h1 className="w-full text-center text-7xl font-extrabold h-24 bg-clip-text animate-gradient bg-radial-[circle_at_center] from-[#3cff52] via-[#7182ff] to-[#3cff52] bg-[length:200%] text-transparent">
                Головна сторінка
            </h1>
            {me ? <ButtonsLoggedIn /> : <ButtonsLoggedOut />}
        </div>
    );
}
