const getProductsLS = () => JSON.parse(localStorage.getItem('products'));

const setProductsLS = (arrProducts) =>
  localStorage.setItem('products', JSON.stringify(arrProducts));

const addProductLocalStorage = (product) => {
  const productsLS = getProductsLS();

  if (!productsLS) return setProductsLS([product]);

  setProductsLS([...productsLS, product]);
};

const updateLocalStorage = (prevProductName, currentProductName) => {
  const productsLS = getProductsLS();

  const newProductsLS = productsLS.map(({ name, purchased }) => {
    if (prevProductName === name) {
      return { name: currentProductName, purchased };
    }

    return { name, purchased };
  });

  setProductsLS(newProductsLS);
};

const deleteLocalStorage = (productName) => {
  const productsLS = getProductsLS();

  const newProductsLS = productsLS.filter(({ name }) => name !== productName);

  setProductsLS(newProductsLS);
};

export { addProductLocalStorage, updateLocalStorage, deleteLocalStorage };
