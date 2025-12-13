
import type { IProduto } from "../interface/produto-interface";

interface cardProps extends IProduto {
    onAddCarrinho?: (produto: IProduto) => void;
}

function Card({ imagem, nome, price, description, id, onAddCarrinho }: cardProps) {

    function handleAdd(){
        if(onAddCarrinho) {
            onAddCarrinho({ id, imagem, nome, price, description });
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <img src={imagem} />
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
                <button className="remove-button">X</button>
            </div>
        </div>
    );
}

export default Card;