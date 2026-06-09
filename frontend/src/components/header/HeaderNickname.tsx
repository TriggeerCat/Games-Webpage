import React, { useEffect, useState } from "react";

import { playerService } from "../../services/player.service";
import { IPlayer } from "../../types/player.types";

export const HeaderNickname = () => {
    const [me, setMe] = useState<IPlayer>();

    const refreshMe = async () => {
        setMe(await playerService.findMe());
    };

    useEffect(() => {
        refreshMe().then();
    }, [me]);

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#3cff52] to-[#7182ff] font-bold text-black">
                {me?.nickname[0] || "P"}
            </div>

            <div className="flex flex-col">
                <span className="text-xs text-white/40">Гравець</span>
                <span className="font-semibold text-white">{me?.nickname}</span>
            </div>
        </div>
    );
};
