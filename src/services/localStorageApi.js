const SHOPPING_CART_KEY = 'online_store';
// const MINUS = -1;

if (!JSON.parse(localStorage.getItem(SHOPPING_CART_KEY))) {
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify([]));
}

export const saveProductsInCart = (productsInCart) => localStorage
  .setItem(SHOPPING_CART_KEY, JSON.stringify(productsInCart));

export const clearProductsInCart = () => saveProductsInCart([]);

export const getProductsInCart = () => {
  const result = JSON
    .parse(localStorage.getItem(SHOPPING_CART_KEY));
  return result;
};

export const removeProductFromCart = (product) => {
  const productsInCart = getProductsInCart();
  if (productsInCart.length > 0) {
    saveProductsInCart(productsInCart.filter((p) => p.id !== product.id));
  }
};
