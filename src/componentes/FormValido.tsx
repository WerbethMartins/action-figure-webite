import React, { useState } from "react";
import { validateForm } from "../hooks/useFormValidation"; // Importação das funções de validação
import { type FormData, type FormErrors } from "../types/formTypes"; // Importação de interfaces

// Define o estado inicial do formulário
const initialFormData: FormData = {
    nome: "",
    email: "",
    senha: "",
};

// Define o estado inicial dos erros (vazio)
const initialFormErrors: FormErrors = {};

function Formulario() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Função genérica para lidar com a mudança nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Valida os dados atuais
        const validationErrors = validateForm(formData);
        
        // 2. Atualiza o state de erros
        setErrors(validationErrors);

        // 3. Verifica se o objeto de erros está vazio
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            console.log("Formulário validado com sucesso. Dados:", formData);
            
            // Simulação de chamada de Envio
            setTimeout(() => {
                alert("Formulário enviado com sucesso!");
                setIsSubmitting(false);
                setFormData(initialFormData); // Limpa o formulário
                setErrors(initialFormErrors); // Limpa os erros
            }, 1000);

        } else {
            console.log("Erros de validação:", validationErrors);
        }
    };

    return (
        <form className="form-login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            
            <div className="name-section">
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                />
                {errors.nome && <p style={{ color: 'red' }}>{errors.nome}</p>}
            </div>

            <div className="email-section">
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            
            <div>
                <label htmlFor="senha">Senha:</label>
                <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                />
                {errors.senha && <p style={{ color: 'red' }}>{errors.senha}</p>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
        </form>
    );
}

export default Formulario;