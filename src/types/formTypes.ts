export interface FormData {
  nome: string;
  email: string;
  senha: string;
  validarSenha?: string; // Para o formulário de cadastro, onde é necessário confirmar a senha
}

export interface FormErrors {
  nome?: string;
  email?: string;
  senha?: string;
  validarSenha?: string; // Para o formulário de cadastro
}