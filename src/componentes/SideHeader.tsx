import { Link, useLocation } from "react-router-dom";

function SideHeader(){
    const location = useLocation();

    const menuItems = [
        {path: "/", label: "HOME"},    
        {path: "produtos", label: "PRODUTOS"},
        {path: "carrinho", label: "CARRINHO"},
        {path: "Sobre", label: "SOBRE"},
        {path: "entrar", label: "ENTRAR"}
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
                                { item.label }
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default SideHeader;