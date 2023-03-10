import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../images/logo.png';
import searchIcon from '../images/searchIcon.png';
import cartImg from '../images/cart.png';
import styles from './styles/Header.module.css';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default function JSX({ numero, handleSearch, handleClick, amIonTheMainPage }, e) {
  return (
    <header className={ styles.header__container }>
      {amIonTheMainPage && (
        <div className={ styles.search__container }>
          <label htmlFor="search">
            <input
              placeholder="Digite o que você busca"
              className={ styles.search__input }
              type="text"
              id="search"
              onChange={ (obj) => handleSearch(obj, e) }
              data-testid="query-input"
              name="search"
            />
          </label>
          <input
            className={ styles.search__icon }
            type="image"
            alt="search icon"
            data-testid="query-button"
            onClick={ () => handleClick(
              e,
              getProductsFromCategoryAndQuery,
            ) }
            src={ searchIcon }
          />
        </div>
      )}
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
  amIonTheMainPage: PropTypes.bool.isRequired,
};
