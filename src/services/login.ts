import { api } from './api';

export const logar = async (code: string) => {
const response = await api.post(`/mail/login/`, {refreshToken: code});
  return response.data;
} 
