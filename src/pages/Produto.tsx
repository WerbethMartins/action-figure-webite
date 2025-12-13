import { useEffect, useState } from 'react'

/* Dados da API FAKE */
import { listarProdutos, adicionarProdutoAPI, type ICarrinhoItem, listarCarrinhoCompleto } from "../services/api";
import { adicionarAoCarrinho } from '../services/api';

/* Componentes */
import Header from '../componentes/Header';
import Cadastro from "../componentes/Cadastro";
import Card from "../componentes/Card";

// import { Produtos } from './data/Produtos';
import type { IProduto } from '../interface/produto-interface';

function Produto() {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [carrinho, setCarrinho] = useState<ICarrinhoItem[]>([]);

    // Pop-up
    const [mensagem, setMensagem] = useState("");
    const [mostrarPopup, setMostrarPopup] = useState(false);

    const [page, setPage] = useState("produtos"); // Controle da seção atual

    // Carregar produtos da API na inicialização
    useEffect(() => {
        async function carregar() {
          const dados = await listarProdutos();
          const dadosCarrinho = await listarCarrinhoCompleto();

          setProdutos(dados)
          setCarrinho(dadosCarrinho)
        }
        carregar();
    }, []);

    async function adicionarProduto(produto: IProduto) {
        try {

        const novoProduto = await adicionarProdutoAPI(produto); 

        setProdutos((prev) => [...prev, novoProduto]);

        setMensagem("Produto cadastrado com sucesso!");
        setMostrarPopup(true);

        setTimeout(() => setMostrarPopup(false), 2000);

        } catch (error) {
        setMensagem("Erro ao cadastrar o produto!");
        setMostrarPopup(true);

        setTimeout(() => setMostrarPopup(false), 2000);
        }
    }

    async function adicionarCarrinho(produto: IProduto) {
      await adicionarAoCarrinho({
          id: produto.id,
          produtoId: produto.id,
          quantidade: 1
      });

      const dados = await listarCarrinhoCompleto();
      setCarrinho(dados);

      setMensagem("Produto adicionado ao carrinho!");
      setMostrarPopup(true);
      setTimeout(() => setMostrarPopup(false), 2000);
    }

    return(
        <>
          <Header activePage={page} onChangePage={setPage} carrinhoCount={carrinho.length} />

          {/* Seção de Formulario */}
          {page === "cadastrar" && (
            <div className='formulario-section'>
              <Cadastro onAddProduto={adicionarProduto} />
            </div>
          )}

          {/* Seção dos Cards */}
          {page === "produtos" && (
            <div className="card-section">
              {produtos.map(item => (
                <Card key={item.id} {...item}  onAddCarrinho={adicionarCarrinho}/>
              ))}
            </div>
          )}

          {/* POPUP */}
          {mostrarPopup && (
            <div className="popup">
              {mensagem}
            </div>
          )}
        </>
    );

}

export default Produto;