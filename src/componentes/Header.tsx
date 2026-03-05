import { Link, useNavigate } from "react-router-dom";
import cartIcon from "../assets/img/shopping-cart-3.png"

{ /* Parametros com TS annotations */}
function Header({ 
    activePage, onChangePage, carrinhoCount }: { activePage: string; onChangePage: (page: string) => void; carrinhoCount: number}) {

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

                    <button 
                        className={`navbar-item ${activePage === "cadastro" ? "active" : ""}`}
                        onClick={() => navigate("/cadastro")}>
                    Cadastrar
                    </button>
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