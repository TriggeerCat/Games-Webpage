import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import React from "react";

import { Header } from "../components/header/Header";
import { ErrorPage } from "../pages/ErrorPage";
import { MeProvider } from "../providers/me.provider";
import { RoomProvider } from "../providers/room.provider";

export const Route = createRootRoute({
    component: () => (
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-teal-100">
            <MeProvider>
                <RoomProvider>
                    <Header />
                    <Outlet />
                    <TanStackRouterDevtools />
                </RoomProvider>
            </MeProvider>
        </div>
    ),
    notFoundComponent: ErrorPage
});
