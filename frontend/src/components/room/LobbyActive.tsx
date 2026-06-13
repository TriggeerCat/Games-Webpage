import { Outlet } from "@tanstack/react-router";
import React from "react";

import { useRoom } from "../../providers/room.provider";
import { PlayerCard } from "./PlayerCard";

export const LobbyActive = () => {
    const { room } = useRoom();

    if (!room) return null;

    return (
        <div className="mx-auto max-w-[1800px] p-6">
            <div className="grid h-[calc(100vh-120px)] grid-cols-[320px_1fr] grid-rows-[100px_1fr_220px] gap-4">
                <section className="row-span-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col">
                    <h2 className="mb-4 text-2xl font-bold text-white">
                        Гравці
                    </h2>

                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col gap-3">
                            {room.playersId.map((player) => (
                                <PlayerCard player={player} key={player._id} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                    <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-radial-[circle_at_center] from-[#3cff52] via-[#7182ff] to-[#3cff52] bg-[length:200%] animate-gradient">
                        Гра
                    </h1>
                </section>

                <section className="row-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 overflow-hidden">
                    <Outlet />
                </section>
            </div>
        </div>
    );
};
