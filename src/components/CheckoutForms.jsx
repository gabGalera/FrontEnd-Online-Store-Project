import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles/CheckoutForms.module.css';

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
        <label htmlFor="name">
          <input
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
        <label htmlFor="email">
          <input
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
        <label htmlFor="cpf">
          <input
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
        <label htmlFor="phoneNumber">
          <input
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
        <label htmlFor="cep">
          <input
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
        <label htmlFor="ticketPayment">
          Boleto
          <input
            data-testid="ticket-payment"
            required
            type="radio"
            name="payment"
            id="ticket"
            value="ticket"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="visa">
          Visa
          <input
            data-testid="visa-payment"
            required
            type="radio"
            name="payment"
            id="visa"
            value="visa"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="masterCard">
          MasterCard
          <input
            data-testid="master-payment"
            required
            type="radio"
            name="payment"
            id="masterCard"
            value="masterCard"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="elo">
          Elo
          <input
            data-testid="elo-payment"
            required
            type="radio"
            name="payment"
            id="elo"
            value="elo"
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ this.onClickFinishButton }
        >
          Finalizar
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
