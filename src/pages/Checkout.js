import PropTypes from 'prop-types';
import React from 'react';
import { getProductsInCart, clearProductsInCart } from '../services/localStorageApi';

class Checkout extends React.Component {
  state = {
    shoppingCartProducts: [],
    name: '',
    email: '',
    cpf: '',
    phoneNumber: '',
    cep: '',
    address: '',
    payment: '',
    error: false,
  };

  componentDidMount() {
    const productList = getProductsInCart();
    this.setState({
      shoppingCartProducts: productList,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClickFinishButton = () => {
    const { name, email, cpf, phoneNumber, cep,
      address, payment } = this.state;
    const validate = [
      name.length > 0,
      email.length > 0,
      cpf.length > 0,
      phoneNumber.length > 0,
      cep.length > 0,
      address.length > 0,
      payment.length > 0,
    ].every(Boolean);
    if (validate) {
      this.setState({ shoppingCartProducts: [] }, () => {
        const { history } = this.props;
        const { shoppingCartProducts } = this.state;
        localStorage.setItem('dataProducts', JSON.stringify(shoppingCartProducts));
        history.push('/');
      });
    } else {
      this.setState({ error: true });
    }

    clearProductsInCart();
    localStorage.clear();
  };

  render() {
    const { shoppingCartProducts, name, email,
      cpf, phoneNumber, cep, address, error } = this.state;
    return (
      <div>
        <div>
          {shoppingCartProducts.map((product) => {
            const { title, index } = product;
            return (
              <div key={ index }>
                <p>{ title }</p>
              </div>
            );
          })}
        </div>
        <form>
          <div>
            <label htmlFor="name">
              <input
                required
                data-testid="checkout-fullname"
                placeholder="Nome completo"
                type="text"
                name="name"
                id="name"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              <input
                required
                data-testid="checkout-email"
                placeholder="E-mail"
                type="text"
                name="email"
                id="email"
                value={ email }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="cpf">
              <input
                required
                data-testid="checkout-cpf"
                placeholder="CPF"
                type="text"
                name="cpf"
                id="cpf"
                value={ cpf }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="phoneNumber">
              <input
                required
                data-testid="checkout-phone"
                placeholder="Número de telefone"
                type="text"
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
                required
                data-testid="checkout-cep"
                placeholder="CEP"
                type="text"
                name="cep"
                id="cep"
                value={ cep }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="address">
              <input
                required
                data-testid="checkout-address"
                placeholder="Endereço"
                type="text"
                name="address"
                id="address"
                value={ address }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="ticketPayment">
              Boleto
              <input
                required
                data-testid="ticket-payment"
                type="radio"
                name="payment"
                id="ticket"
                value="ticket"
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <button
              type="button"
              data-testid="checkout-btn"
              onClick={ this.onClickFinishButton }
            >
              Finalizar
            </button>
          </div>
        </form>
        {error && <p data-testid="error-msg">Campos inválidos</p>}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
