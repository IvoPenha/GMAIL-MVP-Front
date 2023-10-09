import * as yup from "yup";

const email = yup
  .string()
  .required("Campo obrigatório")
  .email("E-mail inválido")
  .max(255, "O e-mail deve ter no máximo 255 caracteres")
  .min(5, "O e-mail deve ter no mínimo 5 caracteres");
const senha = yup
  .string()
  .required("Campo obrigatório")
  .min(3, "A senha deve ter no mínimo 3 caracteres")
  .max(30, "A senha deve ter no máximo 30 caracteres");

const nome = yup
  .string()
  .required("Campo obrigatório")
  .min(3, "O nome deve ter no mínimo 3 caracteres")
  .max(30, "O nome deve ter no máximo 30 caracteres");

const text = yup
  .string()
  .required("Campo obrigatório")
  .min(3, "O texto deve ter no mínimo 3 caracteres")
  .max(300, "O texto deve ter no máximo 300 caracteres");

export const defaultsValidations = {
  email,
  senha,
  nome,
  text,
};
