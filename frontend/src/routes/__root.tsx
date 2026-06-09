import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {HeaderLayout} from "../layouts/HeaderLayout";
import React from "react";

export const Route = createRootRoute({
    component: () => (
        <div
            className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-teal-100">
            <HeaderLayout/>
            <Outlet/>
            <TanStackRouterDevtools/>
        </div>
    ),
})
