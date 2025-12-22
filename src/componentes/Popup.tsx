import React from "react";
import '../style/PopUp.css';

interface PopupProps {
    mensagem: string;
    tipo: 'sucesso' | 'erro' | '';
    visivel: boolean;
}

const Popup: React.FC<PopupProps> = ({ mensagem, tipo, visivel }) => {
    if(!visivel) return null; /* Se não for para mostrar, não renderiza nada*/

    return(
        <div className={`popup-container ${tipo}`}>
            <div className="popup-icon">
                {tipo === 'sucesso' ? '✅' : '❌'}
            </div>
            <span className="popup-message">{mensagem}</span>
        </div>
    );
}

export default Popup;