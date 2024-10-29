import { Component } from "../general.js";

/**
 * Creates a card component to represent the products in cart.
 * @returns {HTMLFormElement} - returns a card used in cart to represent a product in the cart.
 */

export default class CartCard{
    /**
    * @param {{id: number, title: string, price: number,  image: url, amount:number}} cartItem - the product object.
    */
    constructor(cartItem){
        this.id= cartItem.id; this.title= cartItem.title;this. price= cartItem.price;this.  image= cartItem.image;this. amount=cartItem.amount;
        this.node = this.createNode();
    }
    
    createNode(){
        return new Component("div", { id: `product-card-${this.id}`, class: "product-card" }).render();
    }
    
    render(){
    this.node.innerHTML = '';
    const productName = new Component("h4", { id: `product-name-${this.id}`, class: "product-name" }, [this.title]).render();
    const productPrice = new Component("p", { id: `product-price-${this.id}`, class: "product-price" }, [`Price: ${this.price}$`]).render();
    const productImage = new Component("img", { id: `product-img-${this.id}`, class: "product-img", src: this.image }).render();
    const productDescription = new Component("p", { id: `product-desc-${this.id}`, class: "product-desc" }, [this.description]).render();
    const cartBtn = new Component("img", { id: `cart-icon-${this.id}`, class: "cart-btn card-btn", src: "../../styles/resource/shopping-cart-white.png", alt: "cart-icon" }).render();
    const favBtn = new Component("img", { id: `fav-icon-${this.id}`, class: "fav-icon card-btn", src: "../../styles/resource/white-heart.png" }).render();

    const productDetailsContainerLeft = new Component("div", { id: `product-left-container-${this.id}`, class: "product-left-container" }, [productImage]).render();
    const productDetailsContainerRight = new Component("div", { id: `product-right-container-${this.id}`, class: "product-right-container" }, [productPrice, productDescription]).render();
    const productDetailsContainer = new Component("div", { id: `product-details-container-${this.id}`, class: "product-details-container" }, [productDetailsContainerLeft, productDetailsContainerRight]).render();
    const buttonContainer = new Component("div", { id: `button-container-${this.id}`, class: "button-container" }, [favBtn, cartBtn]).render();
    const productHeaderContainer = new Component("div", { id: `product-header-container-${this.id}`, class: "product-header-container" }, [productName, buttonContainer]).render();

    this.node.append(productHeaderContainer, productDetailsContainer);
    }
}
   

// TEST - TO DELETE
const cartProductToTest = {
    "id": 8,
    "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "price": 10.99,
    "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    amount: 10,
  }

let z = new CartCard(cartProductToTest);
console.log("CartCard: ",z);
document.getElementById('root').append(z.render())