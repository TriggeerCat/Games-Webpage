import axios from "axios";

import { IApiError } from "../types/api-error.type";

class PlayerService {
    private readonly axiosInstance = axios.create({
        baseURL: "http://localhost:12250",
        withCredentials: true
    });

    public async findMe() {
        try {
            const { data } = await this.axiosInstance.get("/player/me");
            return data;
        } catch (e) {
            if (axios.isAxiosError<IApiError>(e)) {
                const status = e.response?.status;
                const message = e.response?.data?.message;

                return { status, message };
            }
        }
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
            await this.axiosInstance.patch("player", {
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
}

export const playerService = new PlayerService();
