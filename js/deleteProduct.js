const productsList = document.querySelector('[data-js="products-list"]');

const deleteLocalStorage = (nameOfProduct) => {
  const productsLS = JSON.parse(localStorage.getItem('products-crud'));

  const newProductsLS = productsLS.filter(({ name }) => name !== nameOfProduct);

  localStorage.setItem('products-crud', JSON.stringify(newProductsLS));
};

const deleteProduct = (target) => {
  const nameOfProduct = target.dataset.value;

  deleteLocalStorage(nameOfProduct);

  const products = productsList.querySelectorAll('li');

  Array.from(products).forEach((product) => {
    if (product.dataset.product === nameOfProduct) {
      product.remove();
    }
  });
};

export { deleteProduct };
