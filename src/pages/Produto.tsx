import React, { useEffect, useState } from 'react'

/* Dados da API FAKE */
import { listarProdutos, adicionarProdutoAPI, type ICarrinhoItem, listarCarrinhoCompleto } from "../services/api";
import { adicionarAoCarrinho } from '../services/api';

/* Componentes */
import Header from '../componentes/Header';
import Cadastro from "../componentes/Cadastro";
import Card from "../componentes/productCard";

// import { Produtos } from './data/Produtos';
import type { IProduto } from '../interface/produto-interface';
import Popup from '../componentes/Popup';

function Produto() {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [carrinho, setCarrinho] = useState<ICarrinhoItem[]>([]);

    // Pop-up
    const [popupConfig, setPopupConfig] = React.useState({
      visivel: false,
      mensagem: '',
      tipo: '' as 'sucesso' | 'erro' | ''
    });

    // Função utilitária para não repetir código
    const exibirMensagem = (msg: string, tipo: 'sucesso' | 'erro') => {
        setPopupConfig({ visivel: true, mensagem: msg, tipo: tipo });
        setTimeout(() => setPopupConfig(prev => ({ ...prev, visivel: false })), 3000);
    };

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
        exibirMensagem("Produto cadastrado com sucesso!", "sucesso");

        } catch (error) {
          exibirMensagem("Erro ao cadastrar produto.", "erro");
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

      exibirMensagem("Produto adicionado ao carrinho!", "sucesso");
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
          <Popup 
            visivel={popupConfig.visivel}
            mensagem={popupConfig.mensagem}
            tipo={popupConfig.tipo}
          />
        </>
    );

}

export default Produto;