import { useState } from 'react'
import Header from "./componentes/Header";
import Cadastro from "./componentes/Cadastro";
import Card from "./componentes/Card";

import './App.css'
import { Produtos } from './data/Produtos';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='main-content'>
        <div className='header-section'>
          <Header />
        </div>
        <div className='formulario'>
          <Cadastro />
        </div>
        <div className='card-section'>
          {/* Mapeando o objeto de produtos */}
          {Produtos.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </section>
    </>
  )
}

export default App
