import { Routes, Route, Router } from 'react-router-dom';

/* Componentes */
import SideHeader from "./componentes/SideHeader";

/* Páginas */
import Home from "./pages/Home";
import Produto from './pages/Produto';
import Carrinho from './pages/Carrinho';
import Login from './pages/LoginUsuario';

import './App.css'


function App() {
  

  return (
      <main className='main-content'>
        <SideHeader />
        <div className='header-section'>
          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path="/produtos" element={<Produto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/entrar" element={<Login />} />
          </Routes>
        </div>
      </main>
  )
}

export default App;
