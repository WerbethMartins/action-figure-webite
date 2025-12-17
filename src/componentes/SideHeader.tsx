import { Link, useLocation } from "react-router-dom";

function SideHeader(){
    const location = useLocation();
    const menuItems = [
        {path: "/", label: "HOME", icon: "bi bi-house", span: "Home"},    
        {path: "produtos", label: "PRODUTOS", icon: "bi bi-basket3", span: "Produtos"},
        {path: "carrinho", label: "CARRINHO", icon: "bi bi-cart", span: "Carrinho"},
        {path: "Sobre", label: "SOBRE", icon: "bi bi-file-earmark-person", span: "Sobre"},
        {path: "entrar", label: "ENTRAR", icon: "bi bi-door-closed", span: "Entrar"}
    ];

    return(
        <nav className="side-nav" aria-label="Menu lateral">
            <ul className="side-nav-list">
                {menuItems.map((item) => {
                    
                    // 1. Lógica para definir a classe de esconder
                    const isHiddenItem = item.label === "ENTRAR";
                    
                    // 2. Concatenação de classes do <li>
                    const liClasses = `side-nav-items ${isHiddenItem ? 'hidden-login' : ''}`;

                    return (
                        <li 
                            key={item.path} 
                            className={liClasses}
                        >
                            <Link
                                to={item.path}
                                className={`side-menu-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <i className={item.icon}></i>
                                <span className="tooltip">{item.span}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default SideHeader;