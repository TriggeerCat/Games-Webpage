import React, { createContext, useContext, useMemo, useState } from "react";

import { playerService } from "../services/player.service";
import { IPlayer } from "../types/player.types";

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
    const memo = useMemo(() => ({ me, refreshMe }), []);

    const refreshMe = async () => {
        const me = await playerService.findMe();

        setMe(me);
    };

    return <MeContext value={memo}>{children}</MeContext>;
};

export const useMe = () => {
    const context = useContext(MeContext);

    if (!context) {
        throw new Error("useMe hook must be used within a MeProvider");
    }

    return context;
};
