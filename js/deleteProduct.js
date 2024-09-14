const productsList = document.querySelector('[data-js="products-list"]');

const deleteLocalStorage = (productName) => {
  const productsLS = JSON.parse(localStorage.getItem('products'));

  const newProductsLS = productsLS.filter(({ name }) => name !== productName);

  localStorage.setItem('products', JSON.stringify(newProductsLS));
};

const deleteProduct = (target) => {
  const productName = target.dataset.productname;

  deleteLocalStorage(productName);

  const products = productsList.querySelectorAll('li');

  Array.from(products).forEach((product) => {
    if (product.dataset.productname === productName) {
      product.remove();
    }
  });
};

export { deleteProduct };
