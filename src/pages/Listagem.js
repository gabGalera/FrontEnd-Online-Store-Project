import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Listagem extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = async () => {
    const arrayCategories = await getCategories();
    this.setState({ categories: arrayCategories });
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
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
        <div>
          <p>Categorias:</p>
          {categories
            .map((categoria) => (
              <button
                type="button"
                key={ categoria.id }
                data-testid="category"
              >
                { categoria.name }
              </button>
            ))}
        </div>

      </div>
    );
  }
}

export default Listagem;
