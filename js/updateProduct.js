import { updateLocalStorage } from './localStorage.js';

const saveUpdatedProductName = (target) => {
  const productName = target.dataset.productname;

  const product = document.querySelector(`[data-productName="${productName}"]`);
  const inputProductName = product.querySelector('[data-input="product-name"]');
  const spanProductName = product.querySelector('[data-js="product-name"]');
  const deleteButton = product.querySelector('[data-button="delete"]');
  const inputPurchased = product.querySelector('[data-input="purchased"]');

  const newProductName = inputProductName.value;
  updateLocalStorage(productName, newProductName);

  inputProductName.style.display = 'none';

  spanProductName.style.display = 'block';
  spanProductName.textContent = newProductName;

  deleteButton.dataset.productname = newProductName;
  inputPurchased.dataset.productname = newProductName;

  product.dataset.productname = newProductName;
  target.dataset.productname = newProductName;
  target.innerHTML = '<i class="fa-solid fa-pen"></i>';
  target.dataset.button = 'edit';
};

const updateProductName = (target) => {
  const productName = target.dataset.productname;

  const product = document.querySelector(`[data-productname="${productName}"]`);
  const inputProductName = product.querySelector('[data-input="product-name"]');
  const spanProductName = product.querySelector('[data-js="product-name"]');

  inputProductName.style.display = 'block';
  inputProductName.focus();

  spanProductName.style.display = 'none';

  target.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
  target.dataset.button = 'save';
};

const updatePurchasedStatus = (target) => {
  const productName = target.dataset.productname;
  const isChecked = target.checked;

  const productsLS = JSON.parse(localStorage.getItem('products'));

  const newProductsLS = productsLS.map(({ name, purchased }) => {
    if (name === productName) return { name, purchased: isChecked };

    return { name, purchased };
  });

  localStorage.setItem('products', JSON.stringify(newProductsLS));
};

export { updateProductName, saveUpdatedProductName, updatePurchasedStatus };
