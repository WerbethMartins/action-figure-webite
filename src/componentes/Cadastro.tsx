import { useState } from "react";
import type { IProduto } from "../interface/produto-interface";

import cadastroFigure from '../assets/img/cadastro-figure.jpg';''

interface CadastroProps {
    onAddProduto: (produto: IProduto) => void;
}

function Cadastro({ onAddProduto }: CadastroProps) {
    const [nome, setNome] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imagem, setImagem] = useState<string>("");

    // Função para criar URL da imagem ao criar um novo Produto
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];

        if(file){
            const imageURL = URL.createObjectURL(file); // Cria link temporário
            setImagem(imageURL);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const novoProduto: IProduto = {
            id: Date.now(),
            nome,
            description,
            price: Number(price),
            image: imagem
        };

        onAddProduto(novoProduto);

        // limpa o form
        setNome("");
        setDescription("");
        setPrice("");
        setImagem("");
    }

    return (
        <>
            <form className="formulario" onSubmit={handleSubmit}>

                <label htmlFor="">Imagem do Produto</label>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                {imagem && (
                    <img
                        src={imagem}
                        alt="preview"
                        style={{ width: "150px", marginTop: "10px", borderRadius: "8px" }}
                    />
                )}

                <label>Informe o nome do produto</label>
                <input 
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <div className="desciption-label__header">
                    <label>Informe a descrição</label>
                    <p className="description-label__aviso">A descrição deve ter no máximo 100 caracteres</p>
                </div>
                <textarea 
                    className="text-area"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Informe o preço</label>
                <input 
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button type="submit" className="submit-button">Enviar</button>
            </form>
            <div className="image-animated-section">
                <img src={cadastroFigure} alt="Figura de cadastro" />
            </div>  
        </>
    );
}

export default Cadastro;
