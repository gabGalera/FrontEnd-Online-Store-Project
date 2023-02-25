import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles/CheckoutForms.module.css';
import bar from '../images/bar.png';
import visa from '../images/visa.png';
import elo from '../images/elo.png';
import masterCard from '../images/masterCard.png';

class CheckoutForms extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      cpf: '',
      phoneNumber: '',
      cep: '',
      address: '',
      shoppingCartProducts: false,
      payment: '',
      error: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClickFinishButton = () => {
    const { name, email, cpf, phoneNumber, cep, address, payment } = this.state;
    const validate = name.length > 0
      && email.length > 0
      && cpf.length > 0
      && phoneNumber.length > 0
      && cep.length > 0
      && address.length > 0
      && payment.length > 0;
    if (validate) {
      this.setState({ shoppingCartProducts: [] }, () => {
        const { history } = this.props;
        const { shoppingCartProducts } = this.state;
        localStorage.setItem(
          'dataProducts',
          JSON.stringify(shoppingCartProducts),
        );
        localStorage.clear();
        history.push('/');
      });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { name, email, cpf, phoneNumber, cep, address, error } = this.state;
    return (
      <form
        className={ styles.checkout__forms }
      >
        <h1>Informações do comprador</h1>
        <div>
          <label htmlFor="name">
            <input
              className={ styles.text__inputs }
              data-testid="checkout-fullname"
              placeholder="Nome completo"
              required
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="cpf">
            <input
              className={ styles.text__inputs }
              data-testid="checkout-cpf"
              placeholder="CPF"
              type="text"
              required
              name="cpf"
              id="cpf"
              value={ cpf }
              onChange={ this.onInputChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <input
              className={ styles.text__inputs }
              data-testid="checkout-email"
              placeholder="E-mail"
              required
              type="text"
              name="email"
              id="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="phoneNumber">
            <input
              className={ styles.text__inputs }
              data-testid="checkout-phone"
              placeholder="Número de telefone"
              type="text"
              required
              name="phoneNumber"
              id="phoneNumber"
              value={ phoneNumber }
              onChange={ this.onInputChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="cep">
            <input
              className={ styles.cep__input }
              data-testid="checkout-cep"
              placeholder="CEP"
              type="text"
              required
              name="cep"
              id="cep"
              value={ cep }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="address">
            <input
              className={ styles.address__input }
              data-testid="checkout-address"
              placeholder="Endereço"
              type="text"
              name="address"
              required
              id="address"
              value={ address }
              onChange={ this.onInputChange }
            />
          </label>
        </div>
        <h1>Método de pagamento</h1>
        <div className={ styles.metodos }>
          <label htmlFor="ticketPayment">
            <input
              data-testid="ticket-payment"
              required
              type="radio"
              name="payment"
              id="ticket"
              value="ticket"
              onChange={ this.onInputChange }
            />
            <img src={ bar } alt="" />
          </label>
          <label htmlFor="visa">
            <input
              data-testid="visa-payment"
              required
              type="radio"
              name="payment"
              id="visa"
              value="visa"
              onChange={ this.onInputChange }
            />
            <img src={ visa } alt="" />
          </label>
          <label htmlFor="masterCard">
            <input
              data-testid="master-payment"
              required
              type="radio"
              name="payment"
              id="masterCard"
              value="masterCard"
              onChange={ this.onInputChange }
            />
            <img src={ masterCard } alt="" />
          </label>
          <label htmlFor="elo">
            <input
              data-testid="elo-payment"
              required
              type="radio"
              name="payment"
              id="elo"
              value="elo"
              onChange={ this.onInputChange }
            />
            <img src={ elo } alt="" />
          </label>
        </div>
        <button
          className={ styles.btn }
          type="button"
          data-testid="checkout-btn"
          onClick={ this.onClickFinishButton }
        >
          Comprar
        </button>
        {error && <p data-testid="error-msg">Campos inválidos</p>}
      </form>
    );
  }
}

CheckoutForms.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default CheckoutForms;
