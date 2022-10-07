import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Listagem from './pages/Listagem';
import CarrinhoDeCompras from './pages/CarrinhoDeCompras';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/CarrinhoDeCompras" component={ CarrinhoDeCompras } />
        <Route exact path="/" component={ Listagem } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
