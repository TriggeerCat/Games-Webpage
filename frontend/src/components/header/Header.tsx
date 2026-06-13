import { Link } from "@tanstack/react-router";
import React, { useEffect } from "react";

import { useMe } from "../../providers/me.provider";
import { HeaderNickname } from "./HeaderNickname";

export const Header = () => {
    const { me, refreshMe } = useMe();

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
                        to="/room/actions/join"
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white [&.active]:bg-white/10 [&.active]:text-white"
                    >
                        Доєднатись до кімнати
                    </Link>
                </nav>

                {me ? <HeaderNickname /> : null}
            </div>
        </header>
    );
};
