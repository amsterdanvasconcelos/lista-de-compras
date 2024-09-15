import { addProduct } from './addProduct.js';
import { deleteProduct } from './deleteProduct.js';
import {
  updateProductName,
  saveUpdatedProductName,
  updatePurchasedStatus,
} from './updateProduct.js';

const formAdd = document.querySelector('[data-js="add"]');
const productsList = document.querySelector('[data-js="products-list"]');
const notifications = document.querySelector('[data-js="notifications"]');

let timeOutId = null;

const showAlert = (message) => {
  const html = `
    <div class="toast">
      <div class="toast__content">
        <p class="toast__title">Error:</p>
        <p class="toast__message">${message}</p>
      </div>
    </div>
  `;

  notifications.innerHTML = html;

  if (timeOutId) clearTimeout(timeOutId);
  timeOutId = setTimeout(() => (notifications.innerHTML = ''), 5300);
};

const validateProductName = (productName) => {
  if (!productName.length) {
    showAlert('Você não disse qual produto adicionar!');
    return false;
  }

  const products = productsList.querySelectorAll('li');
  const alreadyExists = Array.from(products).some(
    (product) => product.dataset.productname === productName
  );

  if (alreadyExists) {
    showAlert('Este produto já existe!');
    return false;
  }

  return true;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const productName = event.target.add.value;

  const isValidName = validateProductName(productName);
  if (!isValidName) return;

  const product = { name: productName, purchased: false };
  addProduct(product);

  event.target.reset();
  event.target.add.focus();
};

const handleClick = ({ target }) => {
  const isDeleteButton = target.dataset.button === 'delete';
  const isEditButton = target.dataset.button === 'edit';
  const isSaveButton = target.dataset.button === 'save';

  if (!isDeleteButton && !isEditButton && !isSaveButton) return;

  if (isDeleteButton) return deleteProduct(target);
  if (isEditButton) return updateProductName(target);
  if (isSaveButton) return saveUpdatedProductName(target);
};

const handleChange = ({ target }) => {
  updatePurchasedStatus(target);
};

formAdd.addEventListener('submit', handleSubmit);
productsList.addEventListener('click', handleClick);
productsList.addEventListener('change', handleChange);

const init = () => {
  const productsLS = JSON.parse(localStorage.getItem('products'));

  if (!productsLS || !productsLS.length) return;

  productsLS.forEach((product) => addProduct(product, true));
};

init();
