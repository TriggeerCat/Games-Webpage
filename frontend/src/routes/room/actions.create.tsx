import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

import { roomService } from "../../services/room.service";

export const Route = createFileRoute("/room/actions/create")({
    component: RouteComponent
});

function RouteComponent() {
    const [error, setError] = useState<string>();
    const [playersCount, setPlayersCount] = useState(4);
    const navigate = useNavigate();

    const delay = -Math.floor(Math.random() * 1000);

    const onClickHandler = async () => {
        try {
            const room = await roomService.create(playersCount);
            setError("");
            await navigate({
                to: `/room/room/${room.code}`
            });
        } catch (e) {
            setError(e as string);
        }
    };

    return (
        <div className="flex flex-col items-center gap-10 mt-40">
            <h1 className="w-full text-center text-7xl font-extrabold h-24 bg-clip-text animate-gradient bg-radial-[circle_at_center] from-[#3cff52] via-[#7182ff] to-[#3cff52] bg-[length:200%] text-transparent">
                Створення кімнати
            </h1>

            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white/60">
                            Кількість гравців
                        </label>

                        <input
                            type="number"
                            min={2}
                            max={20}
                            value={playersCount}
                            onChange={(e) => {
                                if (Number(e.target.value) < 2)
                                    setPlayersCount(2);
                                else if (Number(e.target.value) > 20)
                                    setPlayersCount(20);
                                else setPlayersCount(Number(e.target.value));
                            }}
                            className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-lg text-white outline-none transition focus:border-[#7182ff] focus:ring-2 focus:ring-[#7182ff]/30"
                        />
                    </div>

                    <p className="text-red-600">{error}</p>

                    <button
                        className="rounded-xl floating-up-down text-xl px-4 py-2 font-bold text-neutral-900 bg-linear-to-r from-[#EAC5D8] to-[#DBD8F0]"
                        style={{ animationDelay: `${delay}ms` }}
                        onClick={onClickHandler}
                    >
                        Створити кімнату
                    </button>
                </div>
            </div>
        </div>
    );
}
