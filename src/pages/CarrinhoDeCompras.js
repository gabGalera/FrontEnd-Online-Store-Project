import React from 'react';

class CarrinhoDeCompras extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
    };
  }

  componentDidMount() {
    const result = this.loadShoppingCart();
    this.setState({
      shoppingCart: result,
    });
  }

  addItem = ({ target }) => {
    const { shoppingCart } = this.state;
    shoppingCart.map((product) => {
      if (product.id === target.id) {
        if (product.quantity < product.available_quantity) {
          product.quantity += 1;
          return product;
        }
        return product;
      }
      return product;
    });
    this.setState({
      shoppingCart,
    });
  };

  removeItem = ({ target }) => {
    const { shoppingCart } = this.state;
    shoppingCart.map((product) => {
      if (product.id === target.id) {
        if (product.quantity === 1) {
          return product;
        }
        product.quantity -= 1;
        return product;
      }
      return product;
    });
    this.setState({
      shoppingCart,
    });
  };

  loadShoppingCart = () => JSON.parse(localStorage.getItem('produtos'));

  render() {
    const { shoppingCart } = this.state;
    return (
      <div>
        {
          shoppingCart
            ? shoppingCart.map((produto, index) => {
              if (produto.quantity === undefined) {
                produto.quantity = 1;
              }
              return (
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
                        // const { shoppingCart } = this.state;
                        const aux = shoppingCart
                          .filter((entry) => entry.id !== e.target.id);
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
              );
            })
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
      </div>
    );
  }
}

export default CarrinhoDeCompras;
