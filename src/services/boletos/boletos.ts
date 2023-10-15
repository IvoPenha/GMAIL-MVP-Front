import { api } from "..";
import { Situacao } from '../../shared';
import { Boleto } from "../../types";

export const getBoletos = async (id: number): Promise<Boleto[]> => {
  const response = await api.get(`/boletos/${id}`);
  return response.data;
};

export const patchBoletoSituacao = async (id: number, situacao: Situacao) => {
  const response = await api.patch(`/boletos-situacao/${id}`, { situacao });
  return response.data;
}