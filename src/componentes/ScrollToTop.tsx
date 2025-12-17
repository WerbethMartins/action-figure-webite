import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop(){
    const { pathname } = useLocation();

    useEffect(() => {
        // Rola para o topo do documento a cada mudança de rota (pathname)
        window.scrollTo(0, 0);
    }, [pathname]); // O array de dependências monitora a mudança de rota 

    return null;
}

export default ScrollToTop;