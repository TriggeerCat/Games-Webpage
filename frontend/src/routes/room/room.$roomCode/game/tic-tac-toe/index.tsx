import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { SOCKET_EVENTS } from "../../../../../constants/socket.constants";
import { useMe } from "../../../../../providers/me.provider";
import { useRoom } from "../../../../../providers/room.provider";
import { useTicTacToe } from "../../../../../providers/ttt.provider";
import { socket } from "../../../../../sockets/socket";
import { useRoomSocket } from "../../../../../sockets/useRoomSocket";
import { useTicTackToeSocket } from "../../../../../sockets/useTicTacToeSocket";

export const Route = createFileRoute("/room/room/$roomCode/game/tic-tac-toe/")({
    component: RouteComponent
});

function RouteComponent() {
    const { me } = useMe();
    const { room } = useRoom();
    const { TTT } = useTicTacToe();
    useRoomSocket();
    useTicTackToeSocket();

    if (!room || !me || !TTT) return null;

    const playersList = room.playersId;
    const sign =
        me._id === playersList[0]._id
            ? "X"
            : me._id === playersList[1]._id
              ? "O"
              : null;

    const isThisMyTurn = TTT.currentTurn === sign;

    const onClickHandler = (position: number) => {
        return () => {
            if (isThisMyTurn && TTT.currentTurn)
                socket.emit(SOCKET_EVENTS.TTT_PLACE_SIGN, {
                    roomCode: room.code,
                    position,
                    sign
                });
        };
    };

    return (
        <div className="flex h-full flex-col gap-6">
            <section className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <h2 className="text-3xl font-bold text-white">
                    {TTT.currentTurn
                        ? `Хід: ${TTT.currentTurn}${isThisMyTurn ? " (ваш)" : ""}`
                        : "Гру завершено"}
                </h2>

                <p className="mt-2 text-white/60">
                    {TTT.currentTurn
                        ? "Оберіть клітинку для ходу"
                        : "Переможець визначений"}
                </p>
            </section>

            <div className="flex flex-1 items-center justify-center">
                <div
                    className={`grid aspect-square w-full max-w-[350px] grid-cols-3 gap-3 rounded-3xl p-4 border-2 transition-all duration-500
                        ${
                            TTT.currentTurn === "X"
                                ? "border-[#3cff52]/60 shadow-[0_0_40px_rgba(60,255,82,0.25)]"
                                : "border-[#7182ff]/60 shadow-[0_0_40px_rgba(113,130,255,0.25)]"
                        }
                    `}
                >
                    {TTT.board.map((cell, index) => (
                        <button
                            key={index}
                            className="aspect-square rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-5xl font-black transition hover:bg-white/10 hover:scale-[1.03] active:scale-[0.97]"
                            onClick={onClickHandler(index)}
                        >
                            {cell === "X" && (
                                <span className="text-[#3cff52]">X</span>
                            )}

                            {cell === "O" && (
                                <span className="text-[#7182ff]">O</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
