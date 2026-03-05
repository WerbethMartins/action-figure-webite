import React from "react";
import type { IProduto } from "../interface/produto-interface";
import { removerProdutoAPI, type ICarrinhoItem } from "../services/api";
import Popup from "./Popup";

interface cardProps extends IProduto {
    onAddCarrinho?: (produto: IProduto) => void;
}

function Card({ image, nome, price, description, id, onAddCarrinho }: cardProps) {

    const [produtos, setProdutos] = React.useState<IProduto[]>([]);

    const [popupConfig, setPopupConfig] = React.useState({
        visivel: false,
        mensagem: '',
        tipo: '' as 'sucesso' | 'erro' | ''
    });

    const exibirMensagem = (msg: string, tipo: 'sucesso' | 'erro') => {
        setPopupConfig({ visivel: true, mensagem: msg, tipo: tipo });
        setTimeout(() => setPopupConfig(prev => ({ ...prev, visivel: false })), 3000);
    }

    function handleAdd(){
        if(onAddCarrinho) {
            onAddCarrinho({ id, image, nome, price, description });
        }
    }

    async function handleRemove(id:number){
        try {
            await removerProdutoAPI(id);

            // Atualiza estado local removendo da lista
            setProdutos(prev => prev.filter(p => p.id !== id));
            exibirMensagem("Produto removido do carrinho!", "sucesso");

            // Atualiza a página de produtos para refletir a mudança
            window.location.reload();
        } catch (error) {
            exibirMensagem("Erro ao remover produto do carrinho!", "erro");
        }
    }

    return (
         <>      
            <div className="card">
                <div className="card-header">
                    <img src={image} />
                </div>

                <div className="card-title">
                    <h3>{nome}</h3>
                </div>

                <div className="card-description">
                    <p>{description}</p>
                </div>

                <div className="card-footer">
                    <strong>Preço:  R$ {price}</strong>
                </div>
                <div className="card-button">
                    <button className="add-button" onClick={handleAdd}>Adicionar</button>
                    <button className="remove-button" onClick={() => handleRemove(id)}>X</button>
                </div>
            </div>

            {/* Popup */}
            <Popup 
                visivel={popupConfig.visivel}
                mensagem={popupConfig.mensagem}
                tipo={popupConfig.tipo}
            />
       </>
    );
}

export default Card;