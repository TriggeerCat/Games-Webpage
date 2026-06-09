import { Link } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

import { playerService } from "../../services/player.service";
import { HeaderNickname } from "./HeaderNickname";

export const Header = () => {
    const [meCheck, setMeCheck] = useState<boolean>(false);

    const refreshMe = async () => {
        const data = await playerService.findMe();
        if (data?.status === 404) setMeCheck(false);
        else {
            setMeCheck(true);
        }
    };

    useEffect(() => {
        refreshMe().then();
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="mx-auto flex h-16 items-center justify-between px-6">
                <nav className="flex items-center gap-2">
                    <Link
                        to="/"
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white [&.active]:bg-white/10 [&.active]:text-white"
                    >
                        Головна
                    </Link>

                    <Link
                        to="/games"
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white [&.active]:bg-white/10 [&.active]:text-white"
                    >
                        Ігри
                    </Link>
                </nav>

                {meCheck ? <HeaderNickname /> : <></>}
            </div>
        </header>
    );
};
