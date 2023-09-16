import { api } from "./api";

export const getReadMails = async (email:string, token: string) => {
    console.log('getReadMails');
    const response = await api.get("/mail/readAnexos/"+ email+'?after= 09-09-2023', {headers: {Authorization: token}});
    return response.data;
}