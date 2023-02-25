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
      productsName: '',
    };
  }

  componentDidMount() {
    numeroDeProdutosNoCarrinho(this);
    const getLCInfo = JSON.parse(localStorage.getItem('produtos'));
    this.setState(() => ({
      productsName: getLCInfo,
    }));
  }

  render() {
    const {
      productsName, numero,
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
        <div className={ styles.cart__container }>
          <h1>Revise seus produtos</h1>
          {productsName
          && productsName.map((nameProduct, index) => (
            <div
              className={ styles.product__container }
              key={ index }
            >
              <img src={ nameProduct.thumbnail } alt="product" />
              <span>
                {nameProduct.title}
              </span>
              <span>
                {nameProduct.price}
              </span>
            </div>
          ))}
        </div>
        <CheckoutForms history={ history } />
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Checkout;
