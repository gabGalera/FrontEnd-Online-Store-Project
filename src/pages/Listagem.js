import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
// import Detalhes from './Detalhes';

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

  buttonCategories = async ({ target }) => {
    const { id } = target;
    const response = await getProductsFromCategoryAndQuery(id, '');
    const { results } = response;
    this.setState({
      productsSearch: results,
    });
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

  /*   cartAdd = ({ target }) => {
    const { value } = target;
    const { productsSearch } = this.state;
    console.log(value);
    this.setState((prev) => ({ cart: [...prev.cart, value] }));
    const result = productsSearch.find((produto) => produto.id === value);
    localStorage.setItem('Produto', JSON.stringify([...result, result]));
  }; */
  loadShoppingCart = () => JSON.parse(localStorage.getItem('produtos'));

  saveShoppingCart = (product) => localStorage
    .setItem('produtos', JSON.stringify(product));

  cartAdd = ({ target }) => {
    const { value } = target;
    const { productsSearch } = this.state;
    const result = productsSearch.find((produto) => produto.id === value);
    const cart = this.loadShoppingCart();
    // result.quantity = 0;
    if (cart) {
      if (cart.find((item) => item.id === value)) {
        cart.quantity += 1;
        return this.saveShoppingCart([...cart]);
      }
      result.quantity = 1;
      return this.saveShoppingCart([...cart, result]);
    }
    if (result) {
      result.quantity = 1;
      return this.saveShoppingCart([result]);
    }
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
            <button
              type="button"
              key={ categoria.id }
              id={ categoria.id }
              onClick={ this.buttonCategories }
              data-testid="category"
            >
              {categoria.name}
            </button>
          ))}
        </div>
        {
          productsSearch.length > 0
            ? productsSearch.map((item) => (
              <div
                data-testid="product"
                key={ item.id }
              >
                <Link
                  to={ `/Detalhes/${item.id}` }
                  id={ item.id }
                  data-testid="product-detail-link"
                >
                  {item.shipping.free_shipping && (
                    <p data-testid="free-shipping">Frete Grátis</p>
                  )}
                  <p>{item.title}</p>
                  <img src={ item.thumbnail } alt={ item.name } />
                  <p>{item.price}</p>
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  onClick={ this.cartAdd }
                  value={ item.id }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            )) : <p>Nenhum produto foi encontrado</p>
        }
      </div>
    );
  }
}

export default Listagem;
