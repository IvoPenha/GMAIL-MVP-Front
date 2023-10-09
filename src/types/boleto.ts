export type Boleto = {
  id: number;
  enviadoPor: string;
  nomeArquivo: string;
  dataEmail: string;
  messagemId: string;
  assunto?: string;
  dataVencimento: string;
  valor: number;
  linhaDigitavel: string;
  codigoBarras: string;
  base64: string;
};
