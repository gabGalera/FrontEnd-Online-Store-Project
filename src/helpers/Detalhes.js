const setStorage = ({ avaliacao, id }) => {
  localStorage.setItem(id, JSON.stringify(avaliacao));
};

const loadShoppingCart = () => JSON.parse(localStorage.getItem('produtos'));

const saveShoppingCart = (product) => localStorage
  .setItem('produtos', JSON.stringify(product));

export { setStorage, loadShoppingCart, saveShoppingCart };
