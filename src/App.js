import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Listagem from './pages/Listagem';
import CarrinhoDeCompras from './pages/CarrinhoDeCompras';

function App() {
  return (
    <BrowserRouter>
      <Listagem />
      <Switch>
        <Route path="/CarrinhoDeCompras" component={ CarrinhoDeCompras } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
