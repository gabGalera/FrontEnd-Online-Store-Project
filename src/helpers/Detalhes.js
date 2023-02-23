const setStorage = ({ avaliacao, id }) => {
  localStorage.setItem(id, JSON.stringify(avaliacao));
};

const loadShoppingCart = () => JSON.parse(localStorage.getItem('produtos'));

const saveShoppingCart = (product) => localStorage
  .setItem('produtos', JSON.stringify(product));

const getStorage = (id) => {
  const getSavedFromLC = JSON.parse(localStorage.getItem(id.toString()));
  if (getSavedFromLC) {
    this.setState({
      avaliacao: getSavedFromLC,
    });
  }
};

export { setStorage, getStorage, loadShoppingCart, saveShoppingCart };
