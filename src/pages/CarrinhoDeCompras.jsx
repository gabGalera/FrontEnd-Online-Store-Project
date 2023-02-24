import React from 'react';
import { Link } from 'react-router-dom';
import { loadShoppingCart, saveShoppingCart } from '../helpers/helpers';
import styles from './styles/CarrinhoDeCompras.module.css';

class CarrinhoDeCompras extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
    };
  }

  componentDidMount() {
    const result = loadShoppingCart();
    this.setState({
      shoppingCart: result,
    });
  }

  addItem = ({ target }) => {
    const { shoppingCart } = this.state;
    shoppingCart.forEach((product) => {
      if (product.id === target.id) {
        if (product.quantity < product.available_quantity) {
          product.quantity += 1;
          return product;
        }
        return product;
      }
      return product;
    });
    saveShoppingCart([...shoppingCart]);
    this.setState({
      shoppingCart,
    });
  };

  removeItem = ({ target }) => {
    const { shoppingCart } = this.state;
    shoppingCart.forEach((product) => {
      if (product.id === target.id) {
        if (product.quantity === 1) {
          return product;
        }
        product.quantity -= 1;
        return product;
      }
      return product;
    });
    saveShoppingCart([...shoppingCart]);
    this.setState({
      shoppingCart,
    });
  };

  deleteItem = (e) => {
    const { shoppingCart } = this.state;
    const aux = shoppingCart
      .filter((entry) => entry.id !== e.target.id);
    saveShoppingCart([...aux]);
    this.setState({
      shoppingCart: aux,
    });
  };

  render() {
    const { shoppingCart } = this.state;

    return (
      <div className={ styles.container }>
        <div className={ styles.cart__container }>
          {
            shoppingCart
              ? shoppingCart.map((produto, index) => (
                <div
                  className={ styles.product__container }
                  key={ index }
                >
                  <button
                    type="button"
                    id={ produto.id }
                    onClick={ (e) => this.deleteItem(e) }
                    data-testid="remove-product"
                  >
                    Excluir
                  </button>
                  <p data-testid="shopping-cart-product-name">
                    { produto.title }
                  </p>
                  <img src={ produto.thumbnail } alt="product" />
                  <button
                    type="button"
                    id={ produto.id }
                    onClick={ this.addItem }
                    data-testid="product-increase-quantity"
                  >
                    Somar
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    {
                      produto.quantity
                    }
                  </p>
                  <button
                    type="button"
                    id={ produto.id }
                    onClick={ this.removeItem }
                    data-testid="product-decrease-quantity"
                  >
                    Diminuir
                  </button>
                  <p>
                    { produto.price }
                  </p>
                </div>
              ))
              : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          }
        </div>
        <Link
          to="/checkout"
          data-testid="checkout-products"
        >
          Finalizar compra
        </Link>
      </div>
    );
  }
}

export default CarrinhoDeCompras;
