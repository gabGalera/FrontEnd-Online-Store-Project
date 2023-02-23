import PropTypes from 'prop-types';
import styles from './Avaliacao.module.css';

function JSX({ avaliacao }) {
  return (
    <div className={ styles.avaliacao }>
      <h1>Avaliações</h1>
      {avaliacao.length > 0 && avaliacao.map((item, i) => (
        <div key={ i }>
          <p data-testid="review-card-email">{item.email}</p>
          <p data-testid="review-card-rating">{item.rating}</p>
          <p data-testid="review-card-evaluation">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

JSX.propTypes = {
  avaliacao: PropTypes.arrayOf().isRequired,
};

export default JSX;
