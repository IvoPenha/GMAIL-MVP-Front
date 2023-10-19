import { api } from "..";
import { getFirstDayFromPreviousMonthAndLastDayOfTheMonthByYYYYMMstring } from '../../core';
import { Situacao } from '../../shared';
import { Boleto } from "../../types";

export const getBoletos = async (id: number, params?: URLSearchParams): Promise<Boleto[]> => {
  console.log(params)
  const response = await api.get(`/boletos/${id}`, { params });
  return response.data;
};

export const patchBoletoSituacao = async (id: number, situacao: Situacao) => {
  const response = await api.patch(`/boletos-situacao/${id}`, { situacao });
  return response.data;
}

export const readAnexosFromGoogle = async (month: string) => {
  const dates = getFirstDayFromPreviousMonthAndLastDayOfTheMonthByYYYYMMstring(month)
  const params = new URLSearchParams();
  if (dates) {
    const { dataInicio, dataFim } = dates;
    params.append('dataInicio', dataInicio);
    params.append('dataFim', dataFim);
  }


  const response = await api.get(`/mail/readAnexos/me`, { params });
  return response.data;
}