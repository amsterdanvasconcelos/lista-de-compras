const saveLocalStorage = (prevProductName, currentProductName) => {
  const productsLS = JSON.parse(localStorage.getItem('products-crud'));

  const newProductsLS = productsLS.map(({ name, purchased }) => {
    if (prevProductName === name) {
      return { name: currentProductName, purchased };
    }

    return { name, purchased };
  });

  localStorage.setItem('products-crud', JSON.stringify(newProductsLS));
};

const saveEditedProduct = (target) => {
  const nameOfProduct = target.dataset.value;

  const product = document.querySelector(`[data-product="${nameOfProduct}"]`);
  const spanProductName = product.querySelector('[data-js="product-name"]');
  const inputProductName = product.querySelector('[data-input="product-name"]');
  const deleteButton = product.querySelector('[data-button="delete"]');

  const newNameOfProduct = inputProductName.value;

  inputProductName.style.display = 'none';

  saveLocalStorage(nameOfProduct, newNameOfProduct);

  spanProductName.style.display = 'block';
  spanProductName.textContent = newNameOfProduct;

  deleteButton.dataset.value = newNameOfProduct;

  product.dataset.product = newNameOfProduct;
  target.dataset.value = newNameOfProduct;
  target.innerHTML = '<i class="fa-solid fa-pen"></i>';
  target.dataset.button = 'edit';
};

const editProduct = (target) => {
  const nameOfProduct = target.dataset.value;

  const product = document.querySelector(`[data-product="${nameOfProduct}"]`);
  const inputProductName = product.querySelector('[data-input="product-name"]');
  const spanProductName = product.querySelector('[data-js="product-name"]');

  inputProductName.style.display = 'block';
  inputProductName.focus();

  spanProductName.style.display = 'none';

  target.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
  target.dataset.button = 'save';
};

export { editProduct, saveEditedProduct };
