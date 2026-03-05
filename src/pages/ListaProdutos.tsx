import { useState, useEffect } from "react";
import type { IProduto } from "../interface/produto-interface";

import Cadastro from "../componentes/Cadastro";
import Card from "../componentes/productCard";
function ListaProdutos() {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<String | null>(null)

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await fetch("http://localhost:3000/produtos");
                if (!response.ok) throw new Error("Erro ao carregar produtos");
                const data = await response.json();
                setProdutos(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }   
        }

        fetchProdutos();
    }, []);

    async function adicionarProduto(novoProduto: IProduto) {
        try {
            const response = await fetch("http://localhost:3000/produtos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoProduto),
            });
            if (!response.ok) throw new Error("Erro ao salvar produto");
            const produtoSalvo = await response.json();
            setProdutos((prev) => [...prev, produtoSalvo]);
        } catch (err) {
            alert((err as Error).message);
        }
    }

    if (loading) return <p>Carregando produtos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>Cadastro de Produtos</h1>

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
