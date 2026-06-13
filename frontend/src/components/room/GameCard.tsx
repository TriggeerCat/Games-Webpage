import React, { FC } from "react";

import { useGame } from "../../providers/game.provider";
import { IGame } from "../../types/game.type";

type PropsType = {
    thisGame: IGame;
    canSelectCards: boolean;
};

export const GameCard: FC<PropsType> = ({ thisGame, canSelectCards }) => {
    const { selectedGame, selectGame } = useGame();

    const isThisGameSelected = thisGame.id === selectedGame?.id;
    const selectGameHandler = () => {
        if (canSelectCards) selectGame(thisGame.id);
    };

    return (
        <button
            className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:border-[#7182ff]/40 hover:bg-white/10 hover:scale-[1.02] cursor-pointer
                ${
                    isThisGameSelected
                        ? "bg-yellow-500/10 border-yellow-400 ring-2 ring-yellow-400/50 shadow-xl shadow-yellow-500/20"
                        : "border-white/10 bg-white/5 hover:border-[#7182ff]/40 hover:bg-white/10"
                }`}
            onClick={selectGameHandler}
        >
            <div className="aspect-video overflow-hidden bg-black/20">
                {thisGame ? (
                    <img
                        src={thisGame.image}
                        alt={thisGame.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#3cff52]/20 via-[#7182ff]/20 to-[#3cff52]/20">
                        <span className="text-white/40 text-sm">
                            Немає зображення
                        </span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="truncate text-lg font-bold text-white">
                    {thisGame.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-xl bg-black/20 px-3 py-1 text-sm text-white/70">
                        {thisGame.playerCount}
                    </span>

                    <span className="text-xs text-white/30">{thisGame.id}</span>
                </div>
            </div>
        </button>
    );
};
