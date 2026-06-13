import React, { createContext, useContext, useMemo, useState } from "react";

import { GAMES } from "../constants/games.constants";
import { IGame } from "../types/game.type";

type PropsType = {
    children: React.ReactNode;
};

type ContextType = {
    selectedGame: IGame | undefined;
    selectGame: (gameId: string) => void;
};

const GameContext = createContext<ContextType>({
    selectedGame: undefined,
    selectGame: () => {}
});

export const GameProvider = ({ children }: PropsType) => {
    const [selectedGame, setSelectedGame] = useState<IGame>();

    const selectGame = (gameId: string) => {
        for (const game of GAMES) {
            if (game.id === gameId) {
                setSelectedGame(game);
                break;
            }
        }
    };

    const memo = useMemo(() => ({ selectedGame, selectGame }), [selectedGame]);

    return <GameContext.Provider value={memo}>{children}</GameContext.Provider>;
};

export const useGame = () => {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error("useMe hook must be used within a MeProvider");
    }

    return context;
};
