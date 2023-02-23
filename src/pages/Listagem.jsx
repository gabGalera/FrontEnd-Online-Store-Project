import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import styles from './styles/Listagem.module.css';
import Header from '../components/Header';

class Listagem extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      search: '',
      productsSearch: [],
      numero: 0,
    };
  }

  componentDidMount() {
    this.loadCategories();
    this.numeroDeProdutosNoCarrinho();
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

  loadShoppingCart = () => JSON.parse(localStorage.getItem('produtos'));

  saveShoppingCart = (product) => localStorage
    .setItem('produtos', JSON.stringify(product));

  cartAdd = ({ target }) => {
    const { value } = target;
    const { productsSearch } = this.state;
    const result = productsSearch.find((produto) => produto.id === value);
    const cart = this.loadShoppingCart();
    if (cart) {
      if (cart.find((item) => item.id === value)) {
        const item = cart.find((produto) => produto.id === value);
        item.quantity += 1;
        this.numeroDeProdutosNoCarrinho();
        this.saveShoppingCart([...cart]);
        return this.numeroDeProdutosNoCarrinho();
      }
      result.quantity = 1;
      this.saveShoppingCart([...cart, result]);
      return this.numeroDeProdutosNoCarrinho();
    }
    if (result) {
      result.quantity = 1;
      this.saveShoppingCart([result]);
      return this.numeroDeProdutosNoCarrinho();
    }
  };

  numeroDeProdutosNoCarrinho = () => {
    const produtos = this.loadShoppingCart();
    if (produtos) {
      let numero = produtos.map((produto) => produto.quantity);
      numero = numero.reduce((soma, i) => soma + i);

      this.setState({
        numero,
      });
      return numero;
    }
    return 0;
  };

  textFunc = (search, productsSearch) => (
    search.length === 0 && productsSearch.length === 0
      ? (
        <p>
          Nenhum produto foi encontrado
          {/* Você ainda não realizou uma busca */}
        </p>
      )
      : <p>Nenhum produto foi encontrado</p>);

  render() {
    const { categories, productsSearch, numero, search } = this.state;
    return (
      <div>
        {Header(
          {
            numero,
            handleSearch: this.handleSearch,
            handleClick: this.handleClick,
          },
        )}
        <div className={ styles.categories__container }>
          <p className={ styles.categories__title }>Categorias:</p>
          {categories.map((categoria) => (
            <button
              className={ styles.categories }
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
        <div
          className={ styles.products__container }
        >
          {
            productsSearch.length > 0
              ? productsSearch.map((item) => (
                <div
                  className={ styles.product__div }
                  data-testid="product"
                  key={ item.id }
                >
                  <Link
                    className={ styles.product__link }
                    to={ `/Detalhes/${item.id}` }
                    id={ item.id }
                    data-testid="product-detail-link"
                  >
                    <div>
                      <img src={ item.thumbnail } alt={ item.name } />
                      {item.shipping.free_shipping && (
                        <p
                          className={ styles.frete }
                          data-testid="free-shipping"
                        >
                          Frete Grátis
                        </p>
                      )}
                    </div>
                    <p className={ styles.product__title }>{item.title}</p>
                    <p className={ styles.product__price }>
                      <span>
                        R$
                        {' '}
                      </span>
                      {
                        item
                          .price
                          .toLocaleString('pt-br', { minimumFractionDigits: 2 })
                      }
                    </p>
                  </Link>
                  <button
                    className={ styles.product__btn }
                    data-testid="product-add-to-cart"
                    type="button"
                    onClick={ this.cartAdd }
                    value={ item.id }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              )) : (
                <div className={ styles.initial__message }>
                  {this.textFunc(search, productsSearch)}
                  <span data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </span>
                </div>)
          }
        </div>
      </div>
    );
  }
}

export default Listagem;
