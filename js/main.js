import { addProduct } from './addProduct.js';
import { deleteProduct } from './deleteProduct.js';
import { editProduct, saveEditedProduct } from './editProduct.js';

const formAdd = document.querySelector('[data-js="add"]');
const productsList = document.querySelector('[data-js="products-list"]');

const addProductLocalStorage = (product) => {
  const productsLocalStorage = JSON.parse(
    localStorage.getItem('products-crud')
  );

  if (productsLocalStorage) {
    localStorage.setItem(
      'products-crud',
      JSON.stringify([...productsLocalStorage, product])
    );
  } else {
    localStorage.setItem('products-crud', JSON.stringify([product]));
  }
};

const validationNameProduct = (nameOfProduct) => {
  if (!nameOfProduct.length) {
    alert('Você não disse qual produto adicionar!');
    return false;
  }

  const products = productsList.querySelectorAll('li');
  const alreadyExists = Array.from(products).filter(
    (product) => product.dataset.product === nameOfProduct
  );

  if (alreadyExists.length) {
    alert('Este produto já existe!');
    return false;
  }

  return true;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const nameOfProduct = event.target.add.value;

  const isValidName = validationNameProduct(nameOfProduct);
  if (!isValidName) return;

  const product = { name: nameOfProduct, purchased: false };
  addProductLocalStorage(product);
  addProduct(product);

  event.target.reset();
};

const handleClick = ({ target }) => {
  const isDeleteButton = target.dataset.button === 'delete';
  const isEditButton = target.dataset.button === 'edit';
  const isSaveButton = target.dataset.button === 'save';

  if (!isDeleteButton && !isEditButton && !isSaveButton) return;

  if (isDeleteButton) return deleteProduct(target);
  if (isEditButton) return editProduct(target);
  if (isSaveButton) return saveEditedProduct(target);
};

const handleChange = ({ target }) => {
  const nameOfProduct = target.dataset.purchased;
  const isChecked = target.checked;

  const productsLS = JSON.parse(localStorage.getItem('products-crud'));

  const newProductsLS = productsLS.map(({ name, purchased }) => {
    if (name === nameOfProduct) return { name, purchased: isChecked };

    return { name, purchased };
  });

  localStorage.setItem('products-crud', JSON.stringify(newProductsLS));
};

formAdd.addEventListener('submit', handleSubmit);
productsList.addEventListener('click', handleClick);
productsList.addEventListener('change', handleChange);

const init = () => {
  const productsLocalStorage = JSON.parse(
    localStorage.getItem('products-crud')
  );

  if (!productsLocalStorage) return;

  productsLocalStorage.forEach((product) => addProduct(product));
};

init();
