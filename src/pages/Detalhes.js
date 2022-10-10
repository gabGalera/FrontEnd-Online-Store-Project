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
