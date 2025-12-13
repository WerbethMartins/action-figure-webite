import type  { IProduto } from "../interface/produto-interface";

import modelo01 from "../assets/img/Pikachu.webp";
import modelo02 from "../assets/img/pikachu-goku.webp";

export const Produtos: IProduto[] = [
    {
        id: 1,
        imagem: modelo01,
        nome: "Modelo 01",
        preco: 89.90,
        descricao: "Camisa esportiva de alta qualidade."
    },
    {
        id: 2,
        imagem: modelo02,
        nome: "Camisa Oversize",
        preco: 129.90,
        descricao: "Camisa estilo oversize confortável e estilosa."
    }
]