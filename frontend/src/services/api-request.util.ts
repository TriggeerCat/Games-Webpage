import axios from "axios";

import { IApiError } from "../types/api-error.type";

export const apiRequest = async <T>(callback: () => Promise<T>): Promise<T> => {
    try {
        return await callback();
    } catch (e) {
        if (axios.isAxiosError<IApiError>(e)) {
            throw new Error(e.response?.data?.message ?? "Request failed");
        }

        throw e;
    }
};
