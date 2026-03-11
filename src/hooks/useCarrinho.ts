import { useEffect, useState } from "react";

// API
import { listarCarrinhoCompleto, atualizarQuantidadeCarrinho, removerDoCarrinho } from "../services/api";

// Componentes
import type { ICarrinhoItemCompleto } from "../componentes/CarrinhoItemCompleto";

export function useCarrinho() {
    const [carrinho, setCarrinho] = useState<ICarrinhoItemCompleto[]>([]);
    const [loading, setLoading] = useState(true);

    // Lógica de resumo da compra
    const subTotal = carrinho.reduce((acc, item) => {
        return acc + item.produto.price * item.quantidade;
    }, 0);

    // DESCONTO 10% PARA COMPRAS ACIMA DE R$ 500,00
    const desconto = subTotal >= 500 ? subTotal * 0.1 : 0;

    const total = subTotal - desconto;

    // Lógica de compra parcela
    const parcelas = 6;
    const valorParcela   = total / parcelas;


    async function carregarCarrinho(){
        try{

        const dados = await listarCarrinhoCompleto();
        // Filtra itens sem produto e mapeia para o formato correto
        const itensFiltrados = dados
            .filter((item: any) => item.produto !== undefined)
            .map((item: any) => ({
            id: item.id,
            quantidade: item.quantidade,
                produto: {
                    id: item.produto.id,
                    name: item.produto.nome,
                    price: Number(item.produto.price),
                    description: item.produto.description,
                    image: item.produto.image,
                },
            }));
        setCarrinho(itensFiltrados);

        }catch(error){
        console.error("Erro ao carregar carrinho", error);
        }finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        carregarCarrinho();
    }, []);

    async function atualizarQuantidade(id:number, quantidade:number){
        try{
        await atualizarQuantidadeCarrinho(id, quantidade);
        setCarrinho(prev =>
            prev.map(item =>
            item.id === id ? { ...item, quantidade } : item
            )
        );
        }catch(error){
        console.error("Erro ao atualizar quantidade", error);
        }
    }

    async function removerItem(id:number){
        try{    
            await removerDoCarrinho(id);

            setCarrinho(prev => prev.filter(item => item.id !== id));
        }catch(erro){
            console.log("Erro ao tentar remover o item", erro);
        }
    }

    return{
        carrinho,
        setCarrinho,
        subTotal,
        desconto,
        total,
        parcelas,
        valorParcela,
        loading,
        carregarCarrinho,
        atualizarQuantidade, 
        removerItem,
    };
}

