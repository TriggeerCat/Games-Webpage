import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

import { useMe } from "../../providers/me.provider";
import { playerService } from "../../services/player.service";

export const Route = createFileRoute("/player/update")({
    component: RouteComponent
});

function RouteComponent() {
    const [error, setError] = useState<string>();
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();
    const { me, refreshMe } = useMe();

    const delay = -Math.floor(Math.random() * 1000);

    const onClickHandler = async () => {
        try {
            if (me) {
                await playerService.changeNickname(me._id, nickname);
                await refreshMe();
                setError("");
                await navigate({
                    to: "/"
                });
            }
        } catch (e) {
            setError(e as string);
        }
    };

    return (
        <div className="flex flex-col items-center gap-10 mt-60">
            <h1 className="w-full text-center text-7xl font-extrabold h-24 bg-clip-text animate-gradient bg-radial-[circle_at_center] from-[#3cff52] via-[#7182ff] to-[#3cff52] bg-[length:200%] text-transparent">
                Перестворення себе?
            </h1>

            <div className="flex flex-col items-center gap-6 w-full max-w-md">
                <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Введіть свій нікнейм"
                    className="w-full px-6 py-4 text-xl rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-[#7182ff] focus:ring-2 focus:ring-[#7182ff]/40 transition"
                />
                <p className="text-red-600">{error}</p>

                <button
                    className="rounded-xl floating-up-down text-xl px-4 py-2 font-bold text-neutral-900 bg-linear-to-r from-[#EAC5D8] to-[#DBD8F0]"
                    style={{ animationDelay: `${delay}ms` }}
                    onClick={onClickHandler}
                >
                    Змінити
                </button>
            </div>
        </div>
    );
}
