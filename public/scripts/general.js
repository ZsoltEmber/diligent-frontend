/**
 * @param {string} tag - the tag of the html element
 * @param {object} attributes - a key-value pair, representing html attributes for expl. {id:'idOfElement'}
 * @param {Array} attributes - an array of nodes (html elements) to append to the element as children
 * @param {object} listenerObj - a key value pair, the key is the event name, value is the function to add as eventListener {'click':()=>{console.log('')}}
 */
export class Component {
  constructor(tag = "div", attributes = {}, children = [], listenerObj) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.listener = listenerObj; // {'click': ()=>{}}
    this.node = this.render(); // Only for developing reasons
  }

  render() {
    const node = document.createElement(this.tag);
    Object.keys(this.attributes).forEach((attrKey) =>
      node.setAttribute(attrKey, this.attributes[attrKey])
    );
    if (this.children && this.children.length) {
      this.children.forEach((child) => node.append(child));
    }

    if (this.listener) {
      Object.keys(this.listener).forEach((eventName) =>
        node.addEventListener(eventName, this.listener[eventName])
      );
    }

    return node;
  }
}

function getKeyOfUsersCart() {
  return `cart-${localStorage.getItem("signedUserId")}`;
}

function isCartExits() {
  const currentCart = localStorage.getItem(getKeyOfUsersCart());
  return Boolean(currentCart);
}

function setEmptyCart() {
  if (isCartExits()) {
    return;
  } else {
    localStorage.setItem(getKeyOfUsersCart(), "[]");
  }
}

/**
 * checks if the given object is valid product object, returns boolean
 * @param  {{id: number, title: string, price: number, description: string, category: string, image: url, rating: {rate: number,count: number} }} getProduct {id: number, title: string, price: number, description: string, category: string, image: url, rating: {rate: number,count: number} }
 * @returns {boolean} - if the given object is valid product, returns boolean
 */
export function isTypeProduct(getProduct) {
  if (typeof getProduct !== "object") {
    console.error(
      "Wrong value type! The given parameter is not the type 'object'!"
    );
    return false;
  }
  let isValid = true;
  let errorMessage = "";
  const propertysToFind = [
    "id",
    "title",
    "price",
    "description",
    "category",
    "image",
    "rating",
  ];
  propertysToFind.forEach((key) => {
    if (!getProduct.hasOwnProperty(key)) {
      errorMessage += ` ${key},`;
      isValid = false;
    }
  });
  if (errorMessage) {
    console.error(
      "The given parameter is missing the following keys:",
      errorMessage
    );
  }
  return isValid;
}

/**
 * Returns the content of the cart (localStorage) as an array of product objects
 * @returns {{id: number, title: string, price: number, image: url, amount:number}[]} returns an array of objects from the cart.
 */
export function getCartContent() {
  const currentCart = localStorage.getItem(getKeyOfUsersCart());
  if (!currentCart) {
    return [];
  }
  return JSON.parse(currentCart);
}

/**
 * adds the given product object to an array of product objects in cart (localStorage)
 * @param {{id: number, title: string, price: number, description: string, category: string, image: url, rating: {rate: number,count: number} } | {id: number, title: string, price: number, image: url, amount:number}} getProduct {id: number, title: string, price: number, description: string, category: string, image: url, rating: {rate: number,count: number} }
 * @param {number} newAmount - the new number of the added product.
 */
export function addToCart(getProduct, newAmount) {
  const originalData = getCartContent();

  const newCartItem = {
    id: getProduct.id,
    title: getProduct.title,
    price: getProduct.price,
    image: getProduct.image,
    amount: newAmount,
  };

  if (!isCartExits) {
    localStorage.setItem(getKeyOfUsersCart(), JSON.stringify([newCartItem]));
    return;
  }

  const storedProduct = findInCartById(getProduct.id);
  if (storedProduct !== null) {
    originalData.splice(storedProduct.index, 1, newCartItem);
  } else {
    originalData.push(newCartItem);
  }

  localStorage.setItem(getKeyOfUsersCart(), JSON.stringify(originalData));
}

/**
 * Searching for a product with a particular id, and returns an object containing the product and the index of it in Cart.
 * @param  {number} id - the id of the product to find.
 * @returns {{product:object,index:number}|null} - if the product not exists returns null, else returns an object containing the product and the index of it in Cart : {product,index}
 */
export function findInCartById(id) {
  const currentCart = localStorage.getItem(getKeyOfUsersCart());
  if (!currentCart) {
    console.warn("The cart is empty!");
    return null;
  }
  let foundIndex;
  const foundProducts = JSON.parse(currentCart).filter((product, index) => {
    if (product.id == id) {
      foundIndex = index;
    }
    return product.id == id;
  });
  if (foundProducts.length === 0) {
    return null;
  }
  return { product: foundProducts[0], index: foundIndex };
}

/**
 * Removes a product with a particular id from the Cart.
 * @param  {number} id - the id of the product to delete.
 */

export function removeCartItem(id){
  const dataToChange = getCartContent();

  const productToDelete = findInCartById(id);
  if (productToDelete == null) {
    console.log("There is no product in cart with the given id!")
    return;  
  } else {
    dataToChange.splice(productToDelete.index, 1);
  }
  localStorage.setItem(getKeyOfUsersCart(), JSON.stringify(dataToChange));
}