import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { SOCKET_EVENTS } from "../../../../../constants/socket.constants";
import { useRoom } from "../../../../../providers/room.provider";
import { useVll } from "../../../../../providers/vll.provider";
import { socket } from "../../../../../sockets/socket";
import { useRoomSocket } from "../../../../../sockets/useRoomSocket";
import { useVllSocket } from "../../../../../sockets/useVllSocket";

export const Route = createFileRoute(
    "/room/room/$roomCode/game/very-loud-librarians/"
)({
    component: RouteComponent
});

function RouteComponent() {
    const { room } = useRoom();
    const { vll } = useVll();
    useRoomSocket();
    useVllSocket();

    if (!vll || !room) return null;

    const scorePointHandler = (points: number) => {
        return () => {
            socket.emit(SOCKET_EVENTS.VLL_SCORE_POINT, {
                point: points,
                roomCode: room.code
            });
        };
    };

    const newRoundHandler = () => {
        console.log(vll.currentLetter);
        if (!vll.currentLetter[0])
            socket.emit(SOCKET_EVENTS.VLL_START_ROUND, room.code);
    };

    return (
        <div className="flex h-full flex-col gap-6">
            <section className="grid grid-cols-4 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="text-sm text-white/50">Раунд</div>
                    <div className="mt-1 text-3xl font-bold">
                        {vll.currentRound}
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="text-sm text-white/50">Хід</div>
                    <div
                        className={`mt-1 text-3xl font-bold ${
                            vll.currentTurn === "G"
                                ? "text-[#3cff52]"
                                : "text-[#7182ff]"
                        }`}
                    >
                        {vll.currentRound ? vll.currentTurn : ""}
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="text-sm text-white/50">Команда G</div>
                    <div className="mt-1 text-3xl font-bold text-[#3cff52]">
                        {vll.scores[1]}
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="text-sm text-white/50">Команда W</div>
                    <div className="mt-1 text-3xl font-bold text-[#7182ff]">
                        {vll.scores[0]}
                    </div>
                </div>
            </section>

            <div className="grid flex-1 grid-cols-[400px_1fr] gap-6">
                <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <h2 className="mb-6 text-center text-2xl font-bold">
                        Літери
                    </h2>

                    <div className="flex flex-col gap-3">
                        {vll.currentLetter.map((letter, index) => (
                            <button
                                key={`${letter}-${index}`}
                                className={`
                                h-16 rounded-2xl border text-3xl font-black transition
                                hover:scale-[1.02] active:scale-[0.98]
                                    ${
                                        index === 2
                                            ? "border-yellow-400 bg-yellow-500/10 text-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.2)]"
                                            : "border-white/10 bg-black/20 text-white"
                                    }
                                `}
                                onClick={scorePointHandler(index === 2 ? 2 : 1)}
                            >
                                {letter}
                            </button>
                        ))}

                        {vll.currentLetter[0] ? (
                            <button
                                className="
                                mt-6 w-full rounded-2xl border border-white/10
                                bg-white/5 px-4 py-3 text-lg font-semibold
                                transition hover:bg-white/10 active:scale-[0.98]
                            "
                                onClick={scorePointHandler(-1)}
                            >
                                Скинути карту
                            </button>
                        ) : null}

                        <button
                            className="
                                mt-6 w-full rounded-2xl border border-white/10
                                bg-white/5 px-4 py-3 text-lg font-semibold
                                transition hover:bg-white/10 active:scale-[0.98]
                            "
                            onClick={newRoundHandler}
                        >
                            Новий раунд
                        </button>
                    </div>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <h2 className="mb-6 text-center text-2xl font-bold">
                        Категорії
                    </h2>

                    <div className="grid h-8/9 grid-cols-1 gap-4">
                        {vll.currentCategory.map((category, index) => (
                            <div
                                key={`${category}-${index}`}
                                className="
                                    flex items-center
                                    rounded-2xl
                                    border border-white/10
                                    bg-black/20
                                    px-6
                                    text-2xl
                                    font-semibold
                                    transition
                                    hover:bg-black/30
                                "
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
