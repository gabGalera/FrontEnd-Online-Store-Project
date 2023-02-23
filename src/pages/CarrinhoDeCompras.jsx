import React from 'react';
import { Link } from 'react-router-dom';
import { loadShoppingCart, saveShoppingCart } from '../helpers/helpers';

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

  render() {
    const { shoppingCart } = this.state;
    return (
      <div>
        {
          shoppingCart
            ? shoppingCart.map((produto, index) => (
              <div key={ index }>
                <p data-testid="shopping-cart-product-name">
                  { produto.title }
                </p>
                <p>
                  { produto.price }
                </p>
                <div>
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
                  <button
                    type="button"
                    id={ produto.id }
                    onClick={ (e) => {
                      const aux = shoppingCart
                        .filter((entry) => entry.id !== e.target.id);
                      saveShoppingCart([...aux]);
                      this.setState({
                        shoppingCart: aux,
                      });
                    } }
                    data-testid="remove-product"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
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
