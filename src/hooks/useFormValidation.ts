// src/utils/validator.ts
import { type FormData, type FormErrors } from '../types/formTypes';

/**
 * Valida os dados de um formulário de exemplo e retorna um objeto de erros.
 * @param data Os dados do formulário a serem validados.
 * @returns Um objeto FormErrors com mensagens de erro.
 */
export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // 1. Validação do Nome
  if (!data.nome.trim()) {
    errors.nome = "O nome é obrigatório!";
  } else if (data.nome.trim().length < 3) {
    errors.nome = "O nome deve ter pelo menos 3 caracteres.";
  }

  // 2. Validação do Email
  if (!data.email.trim()) {
    errors.email = "O e-mail é obrigatório!";
  } else if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
    // Regex simples para verificar o formato básico de email
    errors.email = "Insira um e-mail válido (ex: seu.email@dominio.com).";
  }

  // 3. Validação da senha
  if (!data.senha) {
    errors.senha = "A senha é obrigatória!";
  } else if (data.senha.length < 8) {
    errors.senha = "A senha deve ter no mínimo 8 caracteres.";
  } else if (!/[A-Z]/.test(data.senha)) {
    errors.senha = "A senha deve conter pelo menos uma letra maiúscula.";
  } else if (!/[a-z]/.test(data.senha)) {
    errors.senha = "A senha deve conter pelo menos uma letra minúscula.";
  } else if (!/[0-9]/.test(data.senha)) {
    errors.senha = "A senha deve conter pelo menos um número.";
  } else if (!/[^A-Za-z0-9]/.test(data.senha)) {
    errors.senha = "A senha deve conter pelo menos um caractere especial (símbolo).";
  }

  return errors;
};