import { useNavigate } from "@tanstack/react-router";
import React from "react";

import { useRoom } from "../../providers/room.provider";
import { PlayerCard } from "./PlayerCard";

export const Lobby = () => {
    const { room } = useRoom();
    const navigate = useNavigate();

    if (!room) return null;

    const leaveRoomHandler = async () => {
        await navigate({
            to: "/"
        });
    };

    return (
        <div className="mx-auto max-w-[1600px] p-6">
            <div className="grid h-[calc(100vh-120px)] grid-cols-[320px_1fr_320px] grid-rows-[100px_1fr_280px] gap-4">
                {/* Players */}
                <section className="row-span-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col">
                    <h2 className="mb-4 text-2xl font-bold text-white">
                        Гравці
                    </h2>

                    <div className="flex-1 flex flex-col gap-3 flex-wrap overflow-y-auto">
                        {room.playersId.map((value) => (
                            <PlayerCard player={value} key={value._id} />
                        ))}
                    </div>

                    <button
                        className="mt-4 rounded-2xl bg-red-500/20 py-3 text-red-300 font-semibold transition hover:bg-red-500/30"
                        onClick={leaveRoomHandler}
                    >
                        Покинути кімнату
                    </button>
                </section>

                {/* Room code */}
                <section className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                    <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-radial-[circle_at_center] from-[#3cff52] via-[#7182ff] to-[#3cff52] bg-[length:200%] animate-gradient">
                        {room.code || "ERROR"}
                    </h1>
                </section>

                {/* Games */}
                <section className="row-span-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                    <h2 className="mb-4 text-2xl font-bold text-white">Ігри</h2>

                    <div className="flex h-7/8 items-center justify-center rounded-2xl border border-dashed border-white/10 text-white/40">
                        Незабаром
                    </div>
                </section>

                {/* Start Game */}
                <section className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                    <button className="group relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#3cff52] via-[#7182ff] to-[#3cff52] bg-[length:200%] animate-gradient transition hover:scale-[1.01] active:scale-[0.99]">
                        <div className="absolute inset-[2px] rounded-[22px] bg-black/30 backdrop-blur-xl" />

                        <span className="relative z-10 text-5xl font-extrabold text-white">
                            Стартувати гру
                        </span>
                    </button>
                </section>

                {/* Controls */}
                <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                    <h2 className="mb-4 text-xl font-bold text-white">
                        Вставити щось сюди потім
                    </h2>

                    <div className="grid h-[calc(100%-40px)] grid-cols-2 gap-4"></div>
                </section>
            </div>
        </div>
    );
};
