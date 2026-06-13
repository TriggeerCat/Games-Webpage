import React, { createContext, useContext, useMemo, useState } from "react";

import { ITicTacToe } from "../types/tic-tac-toe.type";

type PropsType = {
    children: React.ReactNode;
};

type ContextType = {
    TTT: ITicTacToe | undefined;
    refreshTTT: (TTT: ITicTacToe) => void;
};

const TicTakToeContext = createContext<ContextType>({
    TTT: undefined,
    refreshTTT: () => {}
});

export const TicTakToeProvider = ({ children }: PropsType) => {
    const [TTT, setTTT] = useState<ITicTacToe>();

    const refreshTTT = (TTT: ITicTacToe) => {
        setTTT(TTT);
    };

    const memo = useMemo(() => ({ TTT, refreshTTT }), [TTT]);

    return (
        <TicTakToeContext.Provider value={memo}>
            {children}
        </TicTakToeContext.Provider>
    );
};

export const useTicTacToe = () => {
    const context = useContext(TicTakToeContext);

    if (!context) {
        throw new Error(
            "useTicTacToe hook must be used within a TicTacToeProvider"
        );
    }

    return context;
};
