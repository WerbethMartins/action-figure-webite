import type { IProduto } from "../interface/produto-interface";


// Tipo do item no carrinho 
export interface ICarrinhoItem  {
    id: number;
    produtoId: number;
    quantidade: number;
}

const API_URL = "http://localhost:3000";

// ===== PRODUTOS =====
export async function listarProdutos(): Promise<IProduto[]> {
    const response = await fetch(`${API_URL}/produtos`);
    return await response.json();
}

export async function adicionarProdutoAPI(produto: IProduto): Promise<IProduto> {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!response.ok) throw new Error("Erro ao salvar produto na API");
  return await response.json();
}

// ===== CARRINHO =====
export async function listarCarrinho(): Promise<ICarrinhoItem[]> {
    const response = await fetch(`${API_URL}/carrinho`);
    return await response.json();
}

// Lista carrinho e já retorna itens completos com dados do produto
export async function listarCarrinhoCompleto() {
  const [produtos, carrinho] = await Promise.all([
    listarProdutos(),
    listarCarrinho()
  ]);

  return carrinho.map(item => {
    const produto = produtos.find(p => p.id === item.produtoId);

    return {
      ...item,
      produto, // adiciona o objeto completo do produto
    };
  });
}

export async function adicionarAoCarrinho(item: ICarrinhoItem): Promise<ICarrinhoItem> {
    const response = await fetch(`${API_URL}/carrinho`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });

    return await response.json();
}

export async function removerDoCarrinho(id: number): Promise<void> {
    await fetch(`${API_URL}/carrinho/${id}`, {
        method: "DELETE"
    });
}
