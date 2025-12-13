import { useState } from "react";
import type { IProduto } from "../interface/produto-interface";

import Cadastro from "../componentes/Cadastro";
import Card from "../componentes/Card";

function ListaProdutos() {
    const [produtos, setProdutos] = useState<IProduto[]>([]);

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
                        imagem={item.imagem}
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
