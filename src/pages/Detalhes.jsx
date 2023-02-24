import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductId } from '../services/api';
import {
  verifyButton,
  cartAdd,
  numeroDeProdutosNoCarrinho } from '../helpers/helpers';
import styles from './styles/Detalhes.module.css';
import Header from '../components/Header';
import goBack from '../images/goBack.png';
import Avaliacao from '../components/Avaliacao';

class Detalhes extends Component {
  constructor() {
    super();

    this.state = {
      productsSearch: {},
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
    numeroDeProdutosNoCarrinho(this);
  }

  getProduct = async (id) => {
    const response = await getProductId(id);
    this.setState({
      productsSearch: response,
    });
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

  render() {
    const { productsSearch, result, avaliacao, email, rating, comments,
      numero } = this.state;

    return (
      <>
        {Header(
          {
            numero,
            handleSearch: this.handleSearch,
            handleClick: this.handleClick,
          },
        )}
        <div className={ styles.container }>
          <div className={ styles.container__img }>
            <Link to="/" className={ styles.go__back }>
              <img src={ goBack } alt="return" />
              Voltar
            </Link>
            <h1 data-testid="product-detail-name">
              {productsSearch.title}
            </h1>
            <img
              src={ productsSearch.thumbnail }
              alt={ productsSearch.title }
              data-testid="product-detail-image"
            />
          </div>
          <div className={ styles.container__infos }>
            {Avaliacao({ avaliacao })}
            <div className={ styles.price }>
              <p className={ styles.symbol }>
                R$
                {' '}
              </p>
              <p
                className={ styles.money }
                data-testid="product-detail-price"
              >
                { productsSearch
                  .price
                // && productsSearch
                //   .price
                  // .toLocaleString('pt-br', { minimumFractionDigits: 2 })
                }
              </p>
              <button
                className={ styles.btn }
                data-testid="product-detail-add-to-cart"
                type="button"
                value={ productsSearch.id }
                onClick={ ({ target }) => cartAdd(target, this) }
              >
                Add To Cart
              </button>
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
                onClick={ () => verifyButton(this) }
              >
                Enviar
              </button>
            </label>
            {result && <p data-testid="error-msg">Campos inválidos</p>}
          </form>
        </div>
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
