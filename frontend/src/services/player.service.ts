import axios from "axios";

import { IPlayer } from "../types/player.type";
import { apiRequest } from "./api-request.util";

class PlayerService {
    private readonly axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        withCredentials: true
    });

    public findMe() {
        return apiRequest<IPlayer>(async () => {
            const { data } = await this.axiosInstance.get("/player/me");
            return data;
        });
    }

    public async create(nickname: string) {
        return apiRequest<IPlayer>(async () => {
            const { data } = await this.axiosInstance.post("/player", {
                nickname
            });
            return data;
        });
    }

    public async changeNickname(_id: string, nickname: string) {
        return apiRequest<IPlayer>(async () => {
            const { data } = await this.axiosInstance.patch("/player", {
                nickname
            });
            return data;
        });
    }
}

export const playerService = new PlayerService();
