import { useEffect, useState } from "react";

import type { ICarrinhoItemCompleto } from "../interface/CarrinhoItemCompleto";

interface CarrinhoItemProps {
    item: ICarrinhoItemCompleto; 
    onRemover: (id: number) => void;
    onUpdateQuantidade: (id: number, qtde: number) => void;
}

function CarrinhoItem({item, onRemover, onUpdateQuantidade}: CarrinhoItemProps) {
    // Estado local para controlar qual imagem está aparecendo neste card específico
    const [imagemAtiva, setImagemAtiva] = useState(item.produto.image);

    useEffect(() => {
        if(item.produto.image) {
            setImagemAtiva(item.produto.image)
        }
    }, [item.produto.image]); // Toda vez que a imagem do prop mudar, atualiza o estado.

    // Simulando um array de fotos caso o produto tenha apenas uma 
    const fotosGaleria = item.produto.imagens || [item.produto.image]

    return (
        <article className="carrinho-item">
            <div className="info">
                {/* Acesso ao atributo aninhado: item.produto.imagem */}
                {imagemAtiva ? (
                    <img 
                        className="carrinho-item__img" 
                        src={imagemAtiva}  
                        alt={item.produto.name} 
                    />
                ) : (
                    <div className="img-placeholder" >
                        Carregando...
                    </div>
                )}
                
                <div className="item-details">
                    <div className="item-details__informations">
                        {/* Acesso seguro via item.produto */}
                        <h3>{item.produto.name}</h3>
                        <p className="price">R$ {item.produto.price.toFixed(2)}</p>
                        
                        <div className="quantity-control">
                            <button 
                                onClick={() => onUpdateQuantidade(item.id, item.quantidade - 1)}
                                disabled={item.quantidade <= 1}
                            > - </button>
                            
                            <span>{item.quantidade}</span>
                            
                            <button 
                                onClick={() => onUpdateQuantidade(item.id, item.quantidade + 1)}
                            > + </button>
                        </div>
                    </div>

                    <div className="item-details__thumbnails">
                        {fotosGaleria.map((foto, index) => (
                            <img 
                                key={index}
                                className={`thumbnail ${imagemAtiva === foto ? 'active' : ''}`} 
                                src={foto} 
                                alt={`Miniatura ${index}`} 
                                onClick={() => setImagemAtiva(foto)}
                            />
                        ))}
                    </div>

                    <div className="item-details__button-section">
                        <button className="btn-remover" onClick={() => onRemover(item.id)}>
                            Remover
                        </button>
                        <button className="btn-exit-purchase">
                            Continuar comprando
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default CarrinhoItem;