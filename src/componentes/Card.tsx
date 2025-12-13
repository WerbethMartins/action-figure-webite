
import type { IProduto } from "../interface/produto-interface";

function Card({ imagem, nome, preco, descricao }: IProduto) {

    return (
        <div className="card">
            <div className="card-header">
                <img src={imagem} />
            </div>

            <div className="card-title">
                <h3>{nome}</h3>
            </div>

            <div className="card-description">
                <p>{descricao}</p>
            </div>

            <div className="card-footer">
                <strong>Preço:  R$ {preco.toFixed(2)}</strong>
            </div>
        </div>
    );
}

export default Card;