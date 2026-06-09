import { Socket } from "socket.io";

export const onSafe = (
    socket: Socket,
    event: string,
    handler: ((...args: any[]) => Promise<void>) | ((...args: any[]) => void)
) => {
    socket.on(event, async (...args) => {
        try {
            await handler(...args);
        } catch (e) {
            const roomCode = socket.data.roomCode;
            if (roomCode) {
                socket
                    .to(roomCode)
                    .emit(
                        "server-error",
                        e instanceof Error ? e.message : "Unknown error"
                    );
            }

            console.error(e);
        }
    });
};
