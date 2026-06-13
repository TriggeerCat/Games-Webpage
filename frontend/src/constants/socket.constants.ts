export const SOCKET_EVENTS = {
    JOIN_ROOM: "join-room",
    UPDATE_ROOM: "update-room",
    CHANGE_GAME_STATUS: "change-game-status",
    SELECT_GAME: "select-game",
    SERVER_ERROR: "server-error",
    KICKED_OUT: "kicked-out",
    START_MOVING: "start-moving",

    // TTT backend
    TTT_START_GAME: "ttt:start-game",
    TTT_PLACE_SIGN: "ttt:place-sign",
    // TTT frontend
    TTT_UPDATE_GAME: "ttt:update-game"
} as const;
