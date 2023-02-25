import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { numeroDeProdutosNoCarrinho } from '../helpers/helpers';
import styles from './styles/Checkout.module.css';
import goBack from '../images/goBack.png';
import CheckoutForms from '../components/CheckoutForms';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      numero: 0,
      total: 0,
      productsName: '',
    };
  }

  componentDidMount() {
    numeroDeProdutosNoCarrinho(this);
    const getLCInfo = JSON.parse(localStorage.getItem('produtos'));
    this.setState(() => ({
      productsName: getLCInfo,
    }), () => {
      this.totalDaCompra();
    });
  }

  totalDaCompra = () => {
    const { productsName } = this.state;
    if (productsName && productsName.length > 0) {
      let total = productsName.map((item) => item.quantity * item.price);
      total = total.reduce((soma, i) => soma + i);

      this.setState({
        total,
      });
    }
  };

  render() {
    const {
      productsName, numero, total,
    } = this.state;
    const { history } = this.props;
    return (
      <>
        {Header({
          amIonTheMainPage: false,
          numero,
        })}
        <Link to="/" className={ styles.go__back }>
          <img src={ goBack } alt="return" />
          Voltar
        </Link>
        <div className={ styles.container }>
          <div className={ styles.cart__container }>
            <h1>Revise seus produtos</h1>
            {productsName
          && productsName.map((nameProduct, index) => (
            <div
              className={ styles.product__container }
              key={ index }
            >
              <img src={ nameProduct.thumbnail } alt="product" />
              <span
                className={ styles.product__title }
              >
                {nameProduct.title}
              </span>
              <span
                className={ styles.product__price }
              >
                R$
                {' '}
                {nameProduct
                  .price
                  .toLocaleString('pt-br', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
            <p className={ styles.total__text }>
              <span>
                Total:
                R$
                {' '}
                {total.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
              </span>
            </p>
          </div>
          <CheckoutForms history={ history } />
        </div>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Checkout;
