import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../images/logo.png';
import searchIcon from '../images/searchIcon.png';
import cartImg from '../images/cart.png';

export default function JSX({ numero, handleSearch, handleClick, styles }) {
  return (
    <header className={ styles.header__container }>
      <div className={ styles.search__container }>
        <label htmlFor="search">
          <input
            placeholder="Digite o que você busca"
            className={ styles.search__input }
            type="text"
            id="search"
            onChange={ handleSearch }
            data-testid="query-input"
            name="search"
          />
        </label>
        <input
          className={ styles.search__icon }
          type="image"
          alt="search icon"
          data-testid="query-button"
          onClick={ handleClick }
          src={ searchIcon }
        />
      </div>
      <img src={ logo } alt="logo" />
      <Link
        className={ styles.cart__container }
        to="/CarrinhoDeCompras"
        data-testid="shopping-cart-button"
      >
        <input
          className={ styles.cart__image }
          type="image"
          src={ cartImg }
          alt="shopping cart"
        />
        <span
          className={ styles.counter }
          data-testid="shopping-cart-size"
        >
          { `${numero}` }
        </span>
      </Link>
    </header>
  );
}

JSX.propTypes = {
  numero: PropTypes.number.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  styles: PropTypes.shape().isRequired,
};
