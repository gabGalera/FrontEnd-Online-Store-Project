import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

class Listagem extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      search: '',
      productsSearch: [],
    };
  }

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = async () => {
    const arrayCategories = await getCategories();
    this.setState({ categories: arrayCategories });
  };

  handleClick = async () => {
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery('', search);
    const { results } = response;
    this.setState({
      productsSearch: results,
    });
  };

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
  };

  render() {
    const { categories, productsSearch } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="search">
            <input
              type="text"
              id="search"
              onChange={ this.handleSearch }
              data-testid="query-input"
              name="search"
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
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
          {categories.map((categoria) => (
            <button type="button" key={ categoria.id } data-testid="category">
              {categoria.name}
            </button>
          ))}
        </div>

        {
          productsSearch.length > 0
            ? productsSearch.map((item) => (
              <div data-testid="product" key={ item.id }>
                <p>{item.title}</p>
                <img src={ item.thumbnail } alt={ item.name } />
                <p>{item.price}</p>
              </div>
            )) : <p>Nenhum produto foi encontrado</p>
        }

      </div>
    );
  }
}

export default Listagem;
