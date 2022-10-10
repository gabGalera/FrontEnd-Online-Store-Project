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
                <p data-testid="shopping-cart-product-quantity">
                  {
                    shoppingCart.filter((item) => item.id === produto.id).length
                  }
                </p>
              </div>
            ))
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
      </div>
    );
  }
}

export default CarrinhoDeCompras;
