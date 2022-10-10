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
            ? shoppingCart.map((produto) => (
              <div key={ produto.id }>
                <p>
                  { produto.title }
                </p>
                <p>
                  { produto.price }
                </p>
                {/*   {shoppingCart.filter((products) => products.id === produto.id)} */}
              </div>
            ))
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
      </div>
    );
  }
}

export default CarrinhoDeCompras;
