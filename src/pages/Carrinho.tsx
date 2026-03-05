import React, {useEffect ,useState } from "react";

import { useNavigate } from "react-router-dom";

// API
import { criarPedido, limpaCarrinho, listarCarrinhoCompleto, atualizarQuantidadeCarrinho, removerDoCarrinho } from "../services/api";

// Interface
import type { IPedido } from "../interface/pedidoInterface";

// Componentes
import type { ICarrinhoItemCompleto } from "../componentes/CarrinhoItemCompleto";
import CarrinhoItem from "../componentes/CarrinhoItem"; 

// Mensagem POPUP
import Popup from "../componentes/Popup";

function Carrinho() {
  const [carrinho, setCarrinho] = useState<ICarrinhoItemCompleto[]>([]);
  const navigate = useNavigate();

  //Pop-up
  const [popupConfig, setPopupConfig] = React.useState({
    visivel: false,
    mensagem: '',
    tipo: '' as 'sucesso' | 'erro' | ''
  });

  const exibirMensagem = (msg: string, tipo: 'sucesso' | 'erro') => {
    setPopupConfig({ visivel: true, mensagem: msg, tipo: tipo });
    setTimeout(() => setPopupConfig(prev => ({ ...prev, visivel: false })), 3000);
  }

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

  useEffect(() => {
    async function carregar() {
      const dados = await listarCarrinhoCompleto();
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
    }
    carregar();
  }, []);

  // Função para alternar quantidade 
  const alternarQuantidade = async(id: number, novaQuantidade: number) => {
    if(novaQuantidade < 1) return;

    try {
      const itemAtualizado = await atualizarQuantidadeCarrinho(
        id,
        novaQuantidade
      );

      setCarrinho((prev) => 
        prev.map((item) => 
          item.id === id ? { ...item, quantidade: itemAtualizado.quantidade } : item
        )
      );
    }catch(error){
      exibirMensagem("Erro ao atualizar quantidade!", 'sucesso');

    }
  }

  // Função para remover o item do carrinho

  async function removerItem(id: number) {
    try {
      await removerDoCarrinho(id);

      setCarrinho(prev =>
        prev.filter(item => item.id !== id)
      );

      exibirMensagem("Produto removido do carrinho!", 'sucesso');

    } catch (error) {
      exibirMensagem("Erro ao remover o produto!", 'erro');
    }
  } 

  // Função para finalizar o pedido
  async function finalizarPedido() {

    if(carrinho.length === 0) {
      exibirMensagem("Seu carrinho está vazio!", 'erro');

      return;
    }
    try {
      // Montar o objeto do pedido
      const pedido: IPedido = {
        data: new Date().toISOString(),
        itens: carrinho.map((item) => ({
          id: item.id,
          produtoId: item.produto.id,
          quantidade: item.quantidade,
          image: item.produto.image
        })),
        subTotal: subTotal,
        desconto,
        total,
        parcelas,
        valorParcela,
        image: carrinho.find(item => item.produto.image)?.produto.image || "https://via.placeholder.com/150"
      };

      // Criar o pedido na API
      await criarPedido(pedido);

      // Limpar o carrinho na API
      await limpaCarrinho();

      // Limpar o carrinho no estado
      setCarrinho([]);

      exibirMensagem("Pedido finalizado com sucesso! 🎉", 'sucesso');

      //Redireciona página de Pedidos Concluido ao finalizar a compra
      navigate("/pedido-concluido", {
        state: { pedido }
      });
    

    }catch(error) {
      exibirMensagem("Erro ao finalizar o pedido!", 'erro');
    }
  }

  return (
    <>

      <div className="carrinho-section">
        <h2 className="carrinho__title">Carrinho de Compras</h2>

        {carrinho.length === 0 && <p className="carrinho__qt-items">Seu carrinho está vazio 🛒</p>}

        {/* Seção de resumo do item no carrinho*/}
        <section className="carrinho-section__item-resume-section">
            <div className="item-resume-section__items">
              {carrinho.map((item) => (
                  <CarrinhoItem
                    key={item.id}
                    item={item}
                    onRemover={removerItem}
                    onUpdateQuantidade={alternarQuantidade}
                  />
              ))}
            </div>

          {/* Seção de resumo dos valores, descontos e finalização do pedido*/}
          {carrinho.length > 0 && (
            <article className="resumo-section">
              <h3 className="resumo-section__title">Resumo do Pedido</h3>

              <div className="resumo-item__subtotal">
                <span>Subtotal</span>
                <span> R$ {subTotal.toFixed(2)}</span>
              </div>

              {desconto > 0 && (
                <div className="resumo-item__discount">
                  <span>Desconto</span>
                  <span>: R$ {desconto.toFixed(2)}</span>
                </div>
              )}

              <div className="resumo-item total">
                <span>Total</span>
                <span>: R$ {total.toFixed(2)}</span>
              </div>

              <div className="resumo-parcelado">
                <small>
                  Ou {parcelas}x de R$ {valorParcela.toFixed(2)} sem juros
                </small>
              </div>

              <button className="btn-finalizar" onClick={finalizarPedido} >Finalizar Pedido</button>
            </article>
          )}
        </section>

        {/* POPUP */}
        <Popup 
            visivel={popupConfig.visivel}
            mensagem={popupConfig.mensagem}
            tipo={popupConfig.tipo}
        />
      </div>
    </>
  );
}

export default Carrinho;

