import { addProductLocalStorage } from './localStorage.js';

const productsList = document.querySelector('[data-js="products-list"]');

const getDateNow = () => {
  const newDate = new Date();
  const formatedDate = newDate
    .toLocaleString('pt-BR', { timezone: 'UTC' })
    .toString()
    .replace(',', ' -');
  return formatedDate;
};

const createElement = (tagName, props) => {
  const element = document.createElement(tagName);
  const arrProps = Object.entries(props);
  arrProps.forEach(([prop, value]) => {
    if (value) element.setAttribute(prop, value);
  });
  return element;
};

const createButtons = (productName) => {
  const productButtons = createElement('div', { class: 'product__buttons' });

  const buttonEdit = createElement('button', {
    class: 'product__button',
    'data-button': 'edit',
    'data-productname': productName,
  });
  const buttonDelete = createElement('button', {
    class: 'product__button',
    'data-button': 'delete',
    'data-productname': productName,
  });

  buttonEdit.innerHTML = '<i class="fa-solid fa-pen"></i>';
  buttonDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';

  productButtons.append(buttonEdit, buttonDelete);
  return productButtons;
};

const createProductMain = (productName, purchased) => {
  const productMain = createElement('div', { class: 'product__main' });

  const productLabel = createElement('label', { class: 'product__label' });
  const productInput = createElement('input', {
    class: 'product__input',
    type: 'checkbox',
    'data-productname': productName,
    'data-input': 'purchased',
    checked: purchased,
  });

  const inputProductName = createElement('input', {
    class: 'input product__name',
    type: 'text',
    value: productName,
    'data-input': 'product-name',
  });
  const spanProductName = createElement('span', {
    class: 'product__name',
    'data-js': 'product-name',
  });

  spanProductName.textContent = productName;

  productLabel.append(productInput);
  const productButtons = createButtons(productName);

  productMain.append(
    productLabel,
    inputProductName,
    spanProductName,
    productButtons
  );

  return productMain;
};

const createProductItem = ({ name: productName, purchased }) => {
  const product = createElement('li', {
    class: 'product',
    'data-productname': productName,
  });
  const productMain = createProductMain(productName, purchased);
  const productFoot = createElement('p', { class: 'product__footer' });
  productFoot.textContent = getDateNow();

  product.append(productMain, productFoot);
  return product;
};

const addProduct = (product, init) => {
  if (!init) {
    addProductLocalStorage(product);
  }

  const productItem = createProductItem(product);
  productsList.prepend(productItem);
};

export { addProduct };
