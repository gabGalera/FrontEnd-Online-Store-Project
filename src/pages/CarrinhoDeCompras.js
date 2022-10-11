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
        product.quantity += 1;
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
                      produto.quantity > 1 ? produto.quantity : 1
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
      </div>
    );
  }
}

export default CarrinhoDeCompras;
