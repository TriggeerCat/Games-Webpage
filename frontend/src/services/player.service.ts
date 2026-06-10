import axios from "axios";

import { IApiError } from "../types/api-error.type";
import { IPlayer } from "../types/player.types";

class PlayerService {
    private readonly axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        withCredentials: true
    });

    private async apiRequest<T>(callback: () => Promise<T>): Promise<T> {
        try {
            return await callback();
        } catch (e) {
            if (axios.isAxiosError<IApiError>(e)) {
                throw new Error(e.response?.data?.message ?? "Request failed");
            }

            throw e;
        }
    }

    public findMe() {
        return this.apiRequest<IPlayer>(async () => {
            const { data } = await this.axiosInstance.get("/player/me");
            return data;
        });
    }

    public async create(nickname: string) {
        try {
            await this.axiosInstance.post("player", {
                nickname
            });
            return;
        } catch (e) {
            if (axios.isAxiosError<IApiError>(e)) {
                const status = e.response?.status;
                const message = e.response?.data?.message;

                return { status, message };
            }
        }
    }

    public async changeNickname(_id: string, nickname: string) {
        try {
            return await this.axiosInstance.patch("player", {
                nickname
            });
        } catch (e) {
            if (axios.isAxiosError<IApiError>(e)) {
                const status = e.response?.status;
                const message = e.response?.data?.message;

                return { status, message };
            }
        }
    }
}

export const playerService = new PlayerService();
