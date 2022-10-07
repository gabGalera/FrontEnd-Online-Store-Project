import React from 'react';
import { Link } from 'react-router-dom';

class Listagem extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="search">
          <input type="text" id="search" name="search" />
        </label>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/CarrinhoDeCompras" data-testid="shopping-cart-button">
          <button type="button">
            Carrinho de Compras
            <img src="./wireframes/card_03/png" alt="" />
          </button>
        </Link>
      </div>
    );
  }
}

export default Listagem;
