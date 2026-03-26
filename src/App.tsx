import { Routes, Route} from 'react-router-dom';

// RequireAuth, RequireRoles
import { RequireAuth } from './componentes/RequireAuth';
import { RequireRole } from './componentes/RequireRole';

/* Componentes */
import SideHeader from "./componentes/SideHeader";

/* Páginas */
import Home from "./pages/Home";
import Produto from './pages/Produto';
import Carrinho from './pages/Carrinho';
import Cadastro from './componentes/Cadastro';
import Login from './pages/LoginUsuario';
import PedidoConcluido from './pages/PedidoConcluido';
import MeusPedidos from './pages/MeusPedidos';
import About from './pages/About';
import CadastrarUsuario from './pages/CadastrarUsuario';

import './App.css'


function App() {

  return (
    <>
      <main className='main-content'>
        <SideHeader />
          <Routes>
            {/* Rota Pública */}
            <Route path='/' element={ <Home />} />
            <Route path="/produtos" element={<Produto />} />
            <Route path='/sobre' element={<About />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/entrar" element={<Login />} />
            <Route path='/cadastrar-usuario' element={<CadastrarUsuario />} />

            {/* Rota apenas para admin */}
            <Route path="/admin/cadastrar-produto" element={
              <RequireRole rolePermitida='admin'>
                <Cadastro />
              </RequireRole>
            } />
            <Route path='/pedido-concluido' element={<PedidoConcluido /> } />
            <Route path='/pedidos' element={<MeusPedidos /> } />
          </Routes>
      </main>
    </>
  )
}

export default App;
