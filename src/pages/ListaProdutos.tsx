import { useState, useEffect } from "react";
import type { IProduto } from "../interface/produto-interface";

import Cadastro from "../componentes/Cadastro";
import Card from "../componentes/productCard";
function ListaProdutos() {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<String | null>(null)

    function adicionarProduto(produto: IProduto) {
        setProdutos((prev) => [...prev, produto]);
    }

    return (
        <>
            <h1>Cadastro de Produtos</h1>

            <Cadastro onAddProduto={adicionarProduto} />

            <div className="lista-produtos">
                {produtos.map((item) => (
                    <Card 
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        nome={item.nome}
                        description={item.description}
                        price={item.price}
                    />
                ))}
            </div>
        </>
    );
}

export default ListaProdutos;
