import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles/Avaliacao.module.css';
import fullStar from '../images/fullStar.png';
import star from '../images/star.png';

class JSX extends Component {
  numberOfStars = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
  };

  isOneStar = (item) => (Number(item) === this.numberOfStars.one ? (
    <>
      <img src={ fullStar } alt="full star" />
      <img src={ star } alt="star" />
      <img src={ star } alt="star" />
      <img src={ star } alt="star" />
      <img src={ star } alt="star" />
    </>
  ) : (
    <>
      <img src={ star } alt="star" />
      <img src={ star } alt="star" />
      <img src={ star } alt="star" />
      <img src={ star } alt="star" />
      <img src={ star } alt="star" />
    </>));

  isTwoStar = (item) => (Number(item) === this.numberOfStars.two ? (
    <>
      <img src={ fullStar } alt="full star" />
      <img src={ fullStar } alt="full star" />
      <img src={ star } alt="star" />
      <img src={ star } alt="star" />
      <img src={ star } alt="star" />
    </>
  ) : (this.isOneStar(item)));

  isThreeStar = (item) => (Number(item) === this.numberOfStars.three ? (
    <>
      <img src={ fullStar } alt="full star" />
      <img src={ fullStar } alt="full star" />
      <img src={ fullStar } alt="full star" />
      <img src={ star } alt="star" />
      <img src={ star } alt="star" />
    </>
  ) : (this.isTwoStar(item)));

  isFourStar = (item) => (Number(item) === this.numberOfStars.four ? (
    <>
      <img src={ fullStar } alt="full star" />
      <img src={ fullStar } alt="full star" />
      <img src={ fullStar } alt="full star" />
      <img src={ fullStar } alt="full star" />
      <img src={ star } alt="star" />
    </>
  ) : (this.isThreeStar(item)));

  isFiveStar = (item) => (Number(item) === this.numberOfStars.five ? (
    <>
      <img src={ fullStar } alt="full star" />
      <img src={ fullStar } alt="full star" />
      <img src={ fullStar } alt="full star" />
      <img src={ fullStar } alt="full star" />
      <img src={ fullStar } alt="full star" />
    </>
  ) : this.isFourStar(item));

  render() {
    const { avaliacao } = this.props;
    return (
      <div className={ styles.avaliacao }>
        <h1>Avaliações</h1>
        {avaliacao.length > 0 && avaliacao.map((item, i) => (
          <div key={ i }>
            <p
              className={ styles.email }
              data-testid="review-card-email"
            >
              {item.email}
            </p>
            <p
              className={ styles.stars }
              data-testid="review-card-rating"
            >
              {this.isFiveStar(item.rating)}
              {item.rating}
            </p>
            <p
              className={ styles.text }
              data-testid="review-card-evaluation"
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

JSX.propTypes = {
  avaliacao: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

export default JSX;
