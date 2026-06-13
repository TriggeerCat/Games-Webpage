import React, { createContext, useContext, useMemo, useState } from "react";

import { playerService } from "../services/player.service";
import { IPlayer } from "../types/player.type";

type PropsType = {
    children: React.ReactNode;
};

type ContextType = {
    me: IPlayer | undefined;
    refreshMe: () => Promise<void>;
};

const MeContext = createContext<ContextType>({
    me: undefined,
    refreshMe: async () => {}
});

export const MeProvider = ({ children }: PropsType) => {
    const [me, setMe] = useState<IPlayer>();

    const refreshMe = async () => {
        const me = await playerService.findMe();

        setMe(me);
    };

    const memo = useMemo(() => ({ me, refreshMe }), [me]);

    return <MeContext.Provider value={memo}>{children}</MeContext.Provider>;
};

export const useMe = () => {
    const context = useContext(MeContext);

    if (!context) {
        throw new Error("useMe hook must be used within a MeProvider");
    }

    return context;
};
