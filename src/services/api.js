export async function getCategories() {
  try {
    const categoryLink = 'https://api.mercadolibre.com/sites/MLB/categories';
    const promiceLink = await fetch(categoryLink);
    const category = await promiceLink.json();
    return category;
  } catch (err) {
    return 'Erro na busca de categoria';
  }
}

export async function getProductsFromCategoryAndQuery(categoryId = '', query = '') {
  try {
    const categoryIdLink = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=$${query}`;
    const promiceLink = await fetch(categoryIdLink);
    const category = await promiceLink.json();
    return category;
  } catch (err) {
    return 'Erro na busca de categoria';
  }
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
