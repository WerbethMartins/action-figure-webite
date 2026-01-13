import type  { IProduto } from "../interface/produto-interface";

import modelo01 from "../assets/img/Pikachu.webp";
import modelo02 from "../assets/img/pikachu-goku.webp";
import modelo03 from "../assets/img/Boneco-naruto.jpg";

export const Produtos: IProduto[] = [
    {
        id: 1,
        image: modelo01,
        nome: "Modelo 01",
        price: 89.90,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
        id: 2,
        image: modelo02,
        nome: "Modelo 02",
        price: 129.90,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
        id: 3,
        image: modelo03,
        nome: "Modelo 03",
        price: 200.90,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }
]