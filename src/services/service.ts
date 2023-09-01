import { api } from "./api";

export const getReadMails = async () => {
    const response = await api.get("/mail/readAnexos/penha.ivo.dev@gmail.com");
    return response.data;
}