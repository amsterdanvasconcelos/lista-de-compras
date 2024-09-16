import { deleteLocalStorage } from './localStorage.js';
const productsList = document.querySelector('[data-js="products-list"]');

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
