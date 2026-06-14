import React, { createContext, useContext, useMemo, useState } from "react";

import { IVll } from "../types/vll.type";

type PropsType = {
    children: React.ReactNode;
};

type ContextType = {
    vll: IVll | undefined;
    refreshVll: (vll: IVll) => void;
};

const VllContext = createContext<ContextType>({
    vll: undefined,
    refreshVll: () => {}
});

export const VllProvider = ({ children }: PropsType) => {
    const [vll, setVll] = useState<IVll>();

    const refreshVll = (vll: IVll) => {
        setVll(vll);
    };

    const memo = useMemo(() => ({ vll, refreshVll }), [vll]);

    return <VllContext.Provider value={memo}>{children}</VllContext.Provider>;
};

export const useVll = () => {
    return useContext(VllContext);
};
