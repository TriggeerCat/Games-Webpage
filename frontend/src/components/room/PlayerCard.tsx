import React, { FC } from "react";

import { useMe } from "../../providers/me.provider";
import { useRoom } from "../../providers/room.provider";
import { socket } from "../../sockets/socket";
import { IPlayer } from "../../types/player.types";

type PropsType = {
    player: IPlayer;
};

export const PlayerCard: FC<PropsType> = ({ player }) => {
    const { me } = useMe();
    const { room } = useRoom();

    const isMeHost = me?._id === room?.hostId._id;
    const isThisHost = room?.hostId._id === player._id;

    const transferHostHandler = () => {
        socket.emit("transfer-host", player._id);
    };

    const kickPlayerHandler = () => {
        socket.emit("kick-player", player._id);
    };

    return (
        <div className="rounded-xl bg-black/20 p-3 flex items-center justify-between">
            <span>{player.nickname}</span>

            {isThisHost ? (
                <div className="flex gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20">
                        🜲
                    </div>
                </div>
            ) : null}

            {isMeHost && !isThisHost ? (
                <div className="flex gap-2">
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20"
                        onClick={transferHostHandler}
                    >
                        ★
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20"
                        onClick={kickPlayerHandler}
                    >
                        ×
                    </button>
                </div>
            ) : null}

            {!isMeHost && !isThisHost ? (
                <div className="flex gap-2">
                    {/*Invisible div to keep cards even in height*/}
                    <div className="w-8 h-8" />
                </div>
            ) : null}
        </div>
    );
};
