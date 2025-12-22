import { useEffect, useState } from "react";
import { listarCarrinhoCompleto, removerDoCarrinho } from "../services/api";

interface ICarrinhoItemCompleto {
    id: number;
    quantidade: number;
    produto: {
        id: number;
        nome: string;
        price: number;
        description: string;
        imagem: string;
    };
}

function Carrinho() {
  const [carrinho, setCarrinho] = useState<ICarrinhoItemCompleto[]>([]);

  //Pop-up
  const [mensagem, setMensagem] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);

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
            nome: item.produto.nome,
            price: item.produto.price ?? item.produto.price, // caso o campo seja 'preco'
            description: item.produto.description,
            imagem: item.produto.imagem,
          },
        }));
      setCarrinho(itensFiltrados);
    }
    carregar();
  }, []);

  async function removerItem(id: number) {
    try {
      await removerDoCarrinho(id);
      setCarrinho(prev => prev.filter(item => item.id !== id));

      setMensagem("produto removido do carrinho!");
      setMostrarPopup(true);

      setTimeout(() => setMostrarPopup(false), 2000);

    }catch(error) {
      setMensagem("Erro ao remover o produto!");
      setMostrarPopup(true);

      setTimeout(() => setMostrarPopup(false), 2000);
    }
  }

  return (
    <>

      <div className="carrinho-section">
        <h2 className="carrinho__title">Carrinho de Compras</h2>

        {carrinho.length === 0 && <p className="carrinho__qt-items">Seu carrinho está vazio 🛒</p>}

        <div className="carrinho-section__item-resume-section">
            {carrinho.map(item => (
            <div className="carrinho-item" key={item.id}>
              <div className="info">
                <img src={item.produto.imagem} width="80" />
                <div className="item-details">
                  <h3>{item.produto.nome}</h3>
                  <p>Preço: R$ {item.produto.price}</p>
                  <p>Quantidade: {item.quantidade}</p>
                </div>
              </div>

              <button className="btn-remover" onClick={() => removerItem(item.id)}>
                Remover
              </button>
            </div>
          ))}

          {carrinho.length > 0 && (
            <div className="resumo-section">
              <h3 className="resumo-section__title">Resumo do Pedido</h3>

              <div className="resumo-item__subtotal">
                <span>Subtotal</span>
                <span> R${subTotal.toFixed(2)}</span>
              </div>

              {desconto > 0 && (
                <div className="resumo-item__discount">
                  <span>Desconto</span>
                  <span> - R$ {desconto.toFixed(2)}</span>
                </div>
              )}

              <div className="resumo-item total">
                <span>Total</span>
                <span> - R$ {total.toFixed(2)}</span>
              </div>

              <div className="resumo-parcelado">
                <small>
                  Ou {parcelas}x de R$ {valorParcela.toFixed(2)} sem juros
                </small>
              </div>

              <button className="btn-finalizar">
                Finalizar Pedido
              </button>
            </div>
          )}
        </div>

        {/* POPUP */}
        {mostrarPopup && (
          <div className="popup">
            {mensagem}
          </div>
        )}
      </div>
    </>
  );
}

export default Carrinho;

