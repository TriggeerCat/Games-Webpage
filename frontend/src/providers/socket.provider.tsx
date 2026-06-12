import React, { useEffect } from "react";

import { socket } from "../sockets/socket";
import { useMe } from "./me.provider";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { me } = useMe();

    useEffect(() => {
        if (!me) return;

        socket.auth = {
            playerId: me._id
        };

        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, [me]);

    return children;
};
