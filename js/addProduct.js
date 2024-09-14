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

const createButtons = (nameOfProduct) => {
  const productButtons = createElement('div', { class: 'product__buttons' });
  const buttonEdit = createElement('button', {
    class: 'product__button',
    'data-button': 'edit',
    'data-value': nameOfProduct,
  });
  const buttonDelete = createElement('button', {
    class: 'product__button',
    'data-button': 'delete',
    'data-value': nameOfProduct,
  });
  buttonEdit.innerHTML = '<i class="fa-solid fa-pen"></i>';
  buttonDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';

  productButtons.append(buttonEdit, buttonDelete);
  return productButtons;
};

const createProductItem = ({ name: nameOfProduct, purchased }) => {
  const product = createElement('li', {
    class: 'product',
    'data-product': nameOfProduct,
  });
  const productMain = createElement('div', { class: 'product__main' });

  const productFoot = createElement('p', { class: 'product__footer' });
  productFoot.textContent = getDateNow();

  const productLabel = createElement('label', { class: 'product__label' });

  const productInput = createElement('input', {
    class: 'product__input',
    type: 'checkbox',
    'data-purchased': nameOfProduct,
    checked: purchased,
  });

  productLabel.append(productInput);

  const inputProductName = createElement('input', {
    class: 'input',
    type: 'text',
    value: nameOfProduct,
    'data-input': 'product-name',
  });
  const spanProductName = createElement('span', {
    class: 'product__name',
    'data-js': 'product-name',
  });
  spanProductName.textContent = nameOfProduct;

  const productButtons = createButtons(nameOfProduct);

  productMain.append(
    productLabel,
    inputProductName,
    spanProductName,
    productButtons
  );
  product.append(productMain, productFoot);

  return product;
};

const addProduct = (product) => {
  const productItemDOM = createProductItem(product);
  productsList.prepend(productItemDOM);
};

export { addProduct };
