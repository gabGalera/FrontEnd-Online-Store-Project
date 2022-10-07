import React from 'react';

class Listagem extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="search">
          <input type="text" id="search" name="search" />
        </label>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Listagem;
