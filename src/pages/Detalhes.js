import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductId } from '../services/api';

class Detalhes extends Component {
  constructor() {
    super();

    this.state = {
      productsSearch: [],
      result: false,
      avaliacao: [],
      email: '',
      comments: '',
      rating: '',
      numero: 0,
    };
  }

  componentDidMount() {
    const { id: { match: { params } } } = this.props;
    this.getProduct(params.id);
    this.getStorage(params.id);
    this.numeroDeProdutosNoCarrinho();
  }

  getProduct = async (id) => {
    const response = await getProductId(id);
    this.setState({
      productsSearch: response,
    });
  };

  loadShoppingCart = () => JSON.parse(localStorage.getItem('produtos'));

  saveShoppingCart = (product) => localStorage
    .setItem('produtos', JSON.stringify(product));

  handleClick = () => {
    const { productsSearch } = this.state;
    const cart = this.loadShoppingCart();
    this.numeroDeProdutosNoCarrinho();
    if (cart) {
      return this.saveShoppingCart([...cart, productsSearch]);
    }
    return this.saveShoppingCart([productsSearch]);
  };

  handle = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleRating = ({ target }) => {
    const { id } = target;
    this.setState({
      rating: id,
    });
  };

  getStorage = (id) => {
    const getSavedFromLC = JSON.parse(localStorage.getItem(id.toString()));
    if (getSavedFromLC) {
      this.setState({
        avaliacao: getSavedFromLC,
      });
    }
  };

  verifyButton = () => {
    const { email, comments, rating } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const emailVerify = emailRegex.test(email);
    const ratingVerify = rating.length === 0;
    if (emailVerify && !ratingVerify) {
      const avaliacaoObj = {
        email,
        text: comments,
        rating,
      };

      this.setState((prev) => ({
        avaliacao: [...prev.avaliacao, avaliacaoObj],
      }), () => {
        this.setStorage();
        this.setState({
          result: false,
          email: '',
          rating: '',
          comments: '',
        });
      });
    } else {
      this.setState({
        result: true,
      });
    }
  };

  setStorage = () => {
    const { avaliacao, productsSearch: { id } } = this.state;
    localStorage.setItem(id, JSON.stringify(avaliacao));
  };

  numeroDeProdutosNoCarrinho = () => {
    const produtos = this.loadShoppingCart();
    if (produtos) {
      const numero = produtos.map((produto) => produto.quantity)
        .reduce((soma, i) => soma + i);
      this.setState({
        numero,
      });
      return numero;
    }
    return 0;
  };

  render() {
    const { productsSearch, result, avaliacao, email, rating, comments,
      numero } = this.state;

    return (
      <>
        <h1 data-testid="product-detail-name">
          {productsSearch.title}
        </h1>
        <img
          src={ productsSearch.thumbnail }
          alt={ productsSearch.title }
          data-testid="product-detail-image"
        />
        <span data-testid="product-detail-price">{productsSearch.price}</span>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.handleClick }
        >
          Add To Cart
        </button>
        <Link to="/CarrinhoDeCompras">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Carrinho de Compras
          </button>
        </Link>
        <div>
          Número de produtos no carrinho:
          <div data-testid="shopping-cart-size">
            { `${numero}` }
          </div>
        </div>
        <form>
          <label htmlFor="avaliar">
            Avaliar
            <input
              data-testid="1-rating"
              type="radio"
              id="1"
              required
              value={ rating }
              name="rating"
              onClick={ this.handleRating }
            />
            <input
              data-testid="2-rating"
              type="radio"
              id="2"
              required
              value={ rating }
              name="rating"
              onClick={ this.handleRating }
            />
            <input
              data-testid="3-rating"
              type="radio"
              id="3"
              required
              value={ rating }
              name="rating"
              onClick={ this.handleRating }
            />
            <input
              data-testid="4-rating"
              type="radio"
              id="4"
              required
              value={ rating }
              name="rating"
              onClick={ this.handleRating }
            />
            <input
              data-testid="5-rating"
              name="rating"
              id="5"
              required
              value={ rating }
              type="radio"
              onClick={ this.handleRating }
            />
            <input
              data-testid="product-detail-email"
              type="email"
              value={ email }
              name="email"
              required
              onChange={ this.handle }
            />
            <textarea
              data-testid="product-detail-evaluation"
              name="comments"
              value={ comments }
              onChange={ this.handle }
            />
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.verifyButton }
            >
              Enviar
            </button>
          </label>
        </form>
        {result && <p data-testid="error-msg">Campos inválidos</p>}
        {avaliacao.length > 0
            && avaliacao.map((item, i) => (
              <div key={ i }>
                <p data-testid="review-card-email">{item.email}</p>
                <p data-testid="review-card-rating">{item.rating}</p>
                <p data-testid="review-card-evaluation">{item.text}</p>
              </div>
            ))}
      </>
    );
  }
}
Detalhes.propTypes = {
  id: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};
export default Detalhes;
