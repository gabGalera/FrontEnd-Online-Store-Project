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
  if (produtos) {
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
  let result;
  if (productsSearch.length) {
    result = productsSearch.find((produto) => produto.id === value);
  } else {
    result = productsSearch;
  }
  const cart = loadShoppingCart();
  if (cart) {
    if (cart.find((item) => item.id === value)) {
      const item = cart.find((produto) => produto.id === value);
      item.quantity += 1;
      saveShoppingCart([...cart]);
      return numeroDeProdutosNoCarrinho(e);
    }
    result.quantity = 1;
    saveShoppingCart([...cart, result]);
    return numeroDeProdutosNoCarrinho(e);
  }
  if (result) {
    result.quantity = 1;
    saveShoppingCart([result]);
    return numeroDeProdutosNoCarrinho(e);
  }
};

export {
  setStorage, getStorage, loadShoppingCart, saveShoppingCart,
  numeroDeProdutosNoCarrinho, verifyButton, cartAdd };
