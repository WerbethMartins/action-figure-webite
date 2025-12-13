import { useState } from "react";

function Cadastro() {
    const [nome, setNome] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    return(
        <>
            <form className="formulario" action="">
                <label htmlFor="nome">Informe o nome do produto</label>
                <input type="text" 
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <label htmlFor="description">Informe a descriação</label>
                <input type="text" 
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="price">Informe o preço</label>
                <input type="text" 
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default Cadastro;