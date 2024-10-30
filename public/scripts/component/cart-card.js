import { Component } from "../general.js";
import CartForm from "./cart-form.js";
import { removeCartItem,findInCartById } from "../cart.js";

/**
 * Creates a card component to represent the products in cart.
 * @returns {HTMLFormElement} - returns a card used in cart to represent a product in the cart.
 */

export default class CartCard{
    /**
    * @param {{id: number, title: string, price: number,  image: url, amount:number}} cartItem - the product object.
    */
    constructor(cartItem){
        this.cartItem = cartItem;
        this.id= cartItem.id; this.title= cartItem.title;this. price= cartItem.price;this.  image= cartItem.image;
        this.totalPriceP = new Component('p',{},[]).render();
        this.node = this.createNode();
    }
    get amount(){
        return findInCartById(this.id).product.amount;
    }

    createNode(){
        return new Component("div", { id: `product-card-${this.id}`, class: "product-card" }).render();
    }
    handleRemoveItem =() =>{
        removeCartItem(this.id);
        this.node.remove();
    }
    updateProductsTotalPrice = () =>{
        const totalPrice = this.price*this.amount;
        this.totalPriceP.innerText = `${totalPrice}$ total`;
        return this.totalPriceP;
    }

    render(){
    this.node.innerHTML = '';
    const productName = new Component("h4", { id: `product-name-${this.id}`, class: "product-name" }, [this.title]).render();
    const productPrice = new Component("p", { id: `product-price-${this.id}`, class: "product-price" }, [`Price: ${this.price}$`]).render();
    const productImage = new Component("img", { id: `product-img-${this.id}`, class: "product-img", src: this.image }).render();
    
    const productDetailsContainerLeft = new Component("div", { id: `product-left-container-${this.id}`, class: "product-left-container" }, [productImage]).render();
    const cartFormClass = new CartForm(this.cartItem);
          cartFormClass.addToCartBtn.addEventListener("click",this.updateProductsTotalPrice);;
    const cartForm = cartFormClass.render();      
    const removeProductFromCartBtn = new Component('button',{class:"delete-from-cart-button"},["Remove product"],{click:this.handleRemoveItem}).render();
    const productDetailsContainerRight = new Component("div", { id: `product-right-container-${this.id}`, class: "product-right-container" }, [productPrice,this.updateProductsTotalPrice(),cartForm,removeProductFromCartBtn]).render();
    const productDetailsContainer = new Component("div", { id: `product-details-container-${this.id}`, class: "product-details-container" }, [productDetailsContainerLeft, productDetailsContainerRight]).render();
    
    const productHeaderContainer = new Component("div", { id: `product-header-container-${this.id}`, class: "product-header-container" }, [productName]).render();

    this.node.append(productHeaderContainer, productDetailsContainer);
    return this.node;
    }
}
   

// // TEST - TO DELETE
// const cartProductToTest = {
//     "id": 8,
//     "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
//     "price": 10.99,
//     "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
//     amount: 10,
//   }

// let z = new CartCard(cartProductToTest);
// console.log("CartCard: ",z);
// document.getElementById('root').append(z.render())