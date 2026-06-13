import { useParams } from "@tanstack/react-router";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import { roomService } from "../services/room.service";
import { IRoom } from "../types/room.type";

type PropsType = {
    children: React.ReactNode;
};

type ContextType = {
    room: IRoom | undefined;
    setRoom: (room: IRoom) => void;
};

const RoomContext = createContext<ContextType>({
    room: undefined,
    setRoom: () => {}
});

export const RoomProvider = ({ children }: PropsType) => {
    const [room, setRoom] = useState<IRoom>();
    const { roomCode } = useParams({ strict: false });

    const setRoomWrapper = (room: IRoom) => {
        setRoom(room);
    };

    const refreshRoom = async () => {
        if (!roomCode) return;
        const room = await roomService.findOneByCode(roomCode);
        setRoom(room);
    };

    useEffect(() => {
        setRoom(undefined);
        if (!roomCode) return;
        refreshRoom().then();
    }, [roomCode]);

    const memo = useMemo(() => ({ room, setRoom: setRoomWrapper }), [room]);

    return <RoomContext.Provider value={memo}>{children}</RoomContext.Provider>;
};

export const useRoom = () => {
    const context = useContext(RoomContext);

    if (!context) {
        throw new Error("useRoom hook must be used within a RoomProvider");
    }

    return context;
};
