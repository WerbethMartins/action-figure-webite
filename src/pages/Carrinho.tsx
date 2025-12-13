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
        <h2>Itens no Carrinho</h2>

        {carrinho.length === 0 && <p>Seu carrinho está vazio 🛒</p>}

        {carrinho.map(item => (
          <div className="carrinho-item" key={item.id}>
            <img src={item.produto.imagem} width="80" />

            <div className="info">
              <h3>{item.produto.nome}</h3>
              <p>Preço: R$ {item.produto.price}</p>
              <p>Quantidade: {item.quantidade}</p>
            </div>

            <button className="btn-remover" onClick={() => removerItem(item.id)}>
              Remover
            </button>
          </div>
        ))}

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

