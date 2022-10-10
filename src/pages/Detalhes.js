import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductId } from '../services/api';

class Detalhes extends React.Component {
  constructor() {
    super();

    this.state = {
      productsSearch: [],
    };
  }

  componentDidMount() {
    const { id: { match: { params } } } = this.props;
    this.getProduct(params.id);
  }

  getProduct = async (id) => {
    const response = await getProductId(id);
    this.setState({
      productsSearch: response,
    });
  };

  loadShoppingCart = () => JSON.parse(localStorage.getItem('produtos'));

  saveShoppingCart = (product) => localStorage
    .setItem('produtos', JSON.stringify(product));

  handleClick = () => {
    const { productsSearch } = this.state;
    const cart = this.loadShoppingCart();
    if (cart) {
      return this.saveShoppingCart([...cart, productsSearch]);
    }
    return this.saveShoppingCart([productsSearch]);
  };

  render() {
    const { productsSearch } = this.state;

    return (
      <>
        <h1 data-testid="product-detail-name">
          {productsSearch.title}
        </h1>
        <img
          src={ productsSearch.thumbnail }
          alt={ productsSearch.title }
          data-testid="product-detail-image"
        />
        <span data-testid="product-detail-price">{productsSearch.price}</span>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.handleClick }
        >
          Add To Cart
        </button>
        <Link to="/CarrinhoDeCompras">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Carrinho de Compras
          </button>
        </Link>

      </>
    );
  }
}

Detalhes.propTypes = {
  id: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default Detalhes;
