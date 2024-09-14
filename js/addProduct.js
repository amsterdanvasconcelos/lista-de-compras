const productsList = document.querySelector('[data-js="products-list"]');

const addProductLocalStorage = (product) => {
  const productsLS = JSON.parse(localStorage.getItem('products'));

  if (productsLS) {
    localStorage.setItem('products', JSON.stringify([...productsLS, product]));
  } else {
    localStorage.setItem('products', JSON.stringify([product]));
  }
};

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

const createProductItem = ({ name: productName, purchased }) => {
  const product = createElement('li', {
    class: 'product',
    'data-productname': productName,
  });
  const productMain = createElement('div', { class: 'product__main' });

  const productFoot = createElement('p', { class: 'product__footer' });
  productFoot.textContent = getDateNow();

  const productLabel = createElement('label', { class: 'product__label' });
  const productInput = createElement('input', {
    class: 'product__input',
    type: 'checkbox',
    'data-productname': productName,
    'data-input': 'purchased',
    checked: purchased,
  });
  productLabel.append(productInput);

  const inputProductName = createElement('input', {
    class: 'input',
    type: 'text',
    value: productName,
    'data-input': 'product-name',
  });
  const spanProductName = createElement('span', {
    class: 'product__name',
    'data-js': 'product-name',
  });
  spanProductName.textContent = productName;

  const productButtons = createButtons(productName);

  productMain.append(
    productLabel,
    inputProductName,
    spanProductName,
    productButtons
  );
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
