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

export async function getProductId(itemID) {
  try {
    const linkB = `https://api.mercadolibre.com/items/${itemID}`;
    const prometaMe = await fetch(linkB);
    const itens = await prometaMe.json();
    return itens;
  } catch (err) {
    return 'Erro...';
  }
}
