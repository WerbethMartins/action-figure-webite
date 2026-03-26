// Navigate
import { Link, useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../context/AuthContext";

// Icon
import cartIcon from "../assets/img/shopping-cart-3.png"

{ /* Parametros com TS annotations */}
function Header({ 
    activePage, onChangePage, carrinhoCount }: { activePage: string; onChangePage: (page: string) => void; carrinhoCount: number}) {

    const {usuario} = useAuth(); 
    const navigate = useNavigate();
        
    return(
        <header>
            <nav  className="navbar">
                <div className="button-section">
                    <button 
                        className={`navbar-item ${activePage === "produtos" ? "active" : ""}`}
                        onClick={() => navigate("/produtos")}>
                    Produtos
                    </button>

                    {/* Renderiza o link apenas de so usuário for admin*/}
                    {usuario?.role === 'admin' && (
                        <button 
                            className={`navbar-item ${activePage === "cadastro" ? "active" : ""}`}
                            onClick={() => navigate("/admin/cadastrar-produto")}>
                            Cadastrar Produto
                        </button>
                    )}
                </div>

                <div className="shopping-cart-section">
                    <div className="cart-wrapper">
                        {/* Link que direciona para a página de carrinho, que está no menu lateral */}
                        <Link to={"/carrinho"}>
                            <img 
                                src={cartIcon} 
                                alt="Icone de carrinho"  
                                className={`cart-icon ${activePage === "carrinho" ? "active" : ""}`}
                                onClick={() => onChangePage("carrinho")}
                            />  
                        </Link>  
                        {carrinhoCount > 0 && (
                            <span className="cart-badge">{carrinhoCount}</span>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;