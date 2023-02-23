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

const numeroDeProdutosNoCarrinho = (e) => {
  const produtos = loadShoppingCart();
  if (produtos && produtos.length > 0) {
    let numero = produtos.map((produto) => produto.quantity);
    numero = numero.reduce((soma, i) => soma + i);

    e.setState({
      numero,
    });
    return numero;
  }
  return 0;
};

const verifyButton = (e) => {
  const { email, comments, rating } = e.state;
  const emailRegex = /\S+@\S+\.\S+/;
  const emailVerify = emailRegex.test(email);
  const ratingVerify = rating.length === 0;
  if (emailVerify && !ratingVerify) {
    const avaliacaoObj = {
      email,
      text: comments,
      rating,
    };

    e.setState((prev) => ({
      avaliacao: [...prev.avaliacao, avaliacaoObj],
    }), () => {
      const { avaliacao, productsSearch: { id } } = e.state;
      setStorage({ avaliacao, id });
      e.setState({
        result: false,
        email: '',
        rating: '',
        comments: '',
      });
    });
  } else {
    e.setState({
      result: true,
    });
  }
};

const cartAdd = (target, e) => {
  const { value } = target;
  const { productsSearch } = e.state;
  let product;
  console.log(productsSearch);
  if (productsSearch.length) {
    product = productsSearch.find((produto) => produto.id === value);
  } else {
    product = productsSearch;
  }
  let cart = loadShoppingCart();
  if (cart) {
    if (cart.find((item) => item.id === value)) {
      product.quantity = cart
        .find((item) => item.id === value)
        .quantity + 1;

      cart = cart.filter((item) => item.id !== value);
      saveShoppingCart([...cart, product]);
      return numeroDeProdutosNoCarrinho(e);
    }
    product.quantity = 1;
    saveShoppingCart([...cart, product]);
    return numeroDeProdutosNoCarrinho(e);
  }
  product.quantity = 1;
  saveShoppingCart([product]);
  return numeroDeProdutosNoCarrinho(e);
};

export {
  setStorage, getStorage, loadShoppingCart, saveShoppingCart,
  numeroDeProdutosNoCarrinho, verifyButton, cartAdd };
