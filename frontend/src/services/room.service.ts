import axios from "axios";

import { IRoom } from "../types/room.types";
import { apiRequest } from "./api-request.util";

class RoomService {
    private readonly axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        withCredentials: true
    });

    public findOneByCode(code: string) {
        return apiRequest<IRoom>(async () => {
            const { data } = await this.axiosInstance.get(`/room/${code}`);
            return data;
        });
    }

    public async create(maxPlayers: number) {
        return apiRequest<IRoom>(async () => {
            const { data } = await this.axiosInstance.post("/room", {
                maxPlayers
            });
            return data;
        });
    }
}

export const roomService = new RoomService();
