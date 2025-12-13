import { Produtos } from "../data/Produtos";
import  Card  from "../componentes/Card";

export function ListaProdutos() {
    return (    
        <div className="lista-produtos">
            {Produtos.map((item) => (
                <Card 
                    key={item.id}
                    id={item.id}
                    imagem={item.imagem}
                    nome={item.nome}
                    preco={item.preco}
                    descricao={item.descricao} 
                />
            ))}
        </div>
    );
}