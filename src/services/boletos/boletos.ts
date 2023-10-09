import { api } from "..";
import { Boleto } from "../../types";

export const getBoletos = async (id: number): Promise<Boleto[]> => {
  const response = await api.get(`/boletos/${id}`);
  return response.data;
};
