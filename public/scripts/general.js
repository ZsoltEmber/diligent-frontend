/** 
* @param {string} tag - the tag of the html element
* @param {Object} attributes - a key-value pair, representing html attributes for expl. {id:'idOfElement'}
* @param {Array} attributes - an array of nodes (html elements) to append to the element as children
* @param {Object} listenerObj - a key value pair, the key is the event name, value is the function to add as eventListener {'click':()=>{console.log('')}}
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

/**
* checks if the given object is valid product, returns boolean 
* @param  {Object} getProduct {id: number, title: string, price: number, description: string, category: string, image: url, rating: {rate: number,count: number} }
* @returns {boolean} - if the given object is valid product, returns boolean
*/
export function checkProductObject(getProduct){
  if(typeof getProduct !== "object"){
   console.error("Wrong value type! The given parameter is not the type 'object'!") 
    return false;
  }
  let isValid = true;
  let errorMessage = '';
  const propertysToFind = ['id', 'title', 'price', 'description', 'category', 'image', 'rating']
  propertysToFind.forEach(key=>{
    if(!getProduct.hasOwnProperty(key)){
      errorMessage+= ` ${key},`;
      isValid = false;
    }
  })
  if(errorMessage){
    console.error("The given parameter is missing the following keys:",errorMessage);
  }
  return isValid;
}

/**
* Returns the content of the cart (sessionStorage) as an array of product objects 
* @returns {Array} [{id: number, title: string, price: number, description: string, category: string, image: url, rating: {rate: number,count: number} }]
*/
  export function getCartContent(){
    const currentCart = sessionStorage.getItem('cart')
    if(!currentCart){
      return [];
    }
    return JSON.parse(currentCart);
  }

/**
* adds the given product object to an array of product objects in cart (sessionStorage) 
* @param {Object} getProduct {id: number, title: string, price: number, description: string, category: string, image: url, rating: {rate: number,count: number} }
*/
export function addToCart(getProduct){
  if(!checkProductObject(getProduct)){
    return;
  };
  const currentCart = sessionStorage.getItem('cart')
  if(!currentCart){
    sessionStorage.setItem('cart',JSON.stringify([getProduct]));
    return;
  }
  const originalData = getCartContent();
  originalData.push(getProduct);
  sessionStorage.setItem('cart',JSON.stringify(originalData));
}