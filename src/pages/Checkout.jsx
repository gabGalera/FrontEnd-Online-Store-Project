import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { numeroDeProdutosNoCarrinho } from '../helpers/helpers';

class Checkout extends React.Component {
  state = {
    numero: 0,
    productsName: '',
    shoppingCartProducts: false,
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
    numeroDeProdutosNoCarrinho(this);
    const getLCInfo = JSON.parse(localStorage.getItem('produtos'));
    const getLCName = getLCInfo.map((item) => item.title);
    this.setState(() => ({
      productsName: getLCName,
    }));
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
    const {
      productsName,
      name,
      email,
      cpf,
      phoneNumber,
      cep,
      address,
      error,
      numero,
    } = this.state;

    return (
      <div>
        {Header({
          amIonTheMainPage: false,
          numero,
        })}
        {productsName.length > 0
          && productsName.map((nameProduct, index) => (
            <div key={ index }>
              <p>
                {nameProduct}
              </p>
            </div>
          ))}
        <form>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
  history: PropTypes.shape().isRequired,
};
export default Checkout;
