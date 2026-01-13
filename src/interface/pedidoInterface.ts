import type { ICarrinhoItem } from './carrinho-interface';

export interface IPedido {
  data: string;
  itens: ICarrinhoItem[];
  subTotal: number;
  desconto: number;
  total: number;
  parcelas: number;
  valorParcela: number;
}