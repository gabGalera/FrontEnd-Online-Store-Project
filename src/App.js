import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Listagem from './pages/Listagem';
import CarrinhoDeCompras from './pages/CarrinhoDeCompras';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Listagem } />
        <Route exact path="/CarrinhoDeCompras" component={ CarrinhoDeCompras } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
