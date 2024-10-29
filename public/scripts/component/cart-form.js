import { findInCartById } from "../cart.js";
import { Component } from "../general.js";

/**
 * Creates a form to change handle cart changes of the given product
 * @param {{id: number, title: string, price: number, description: string, category: string, image: url, rating: {rate: number,count: number} }} getProduct - the product object.
 * @returns {HTMLFormElement} - returns a form containing input and button to change amount of given product in cart.
 */
export default class CartForm {
    /**
    * @param {{id: number, title: string, price: number, description: string, category: string, image: url, rating: {rate: number,count: number} }} getProduct - the product object.
    */
    constructor(getProduct) {
    this.product = getProduct;
    this.amount = findInCartById(this.product.id)? findInCartById(this.product.id).product.amount : 1;
    this.inputField = this.createInputField();
    
    this.node = new Component('form',{class:"cart-form--form"}).render();
    }
    
    createInputField (){
        const inputField = new Component('input',{
            class:"form-input",
            id: `amount-of-${this.product.title}`,
            type:"number",
            min:"1",
            max:"100",
            name:`amount-of-${this.product.title}`,
            value: this.amount,
        })
            
        return inputField.render();
    } 

    render(){
        
        const labelForInput = new Component('label',{for:`amount-of-${this.product.title}`},["Amount:  ",this.inputField]).render();
        const inputContainerDiv = new Component('div',{class:"cart-form--container"},[labelForInput]).render();
        
        const addToCartBtn = new Component(
            "button",
            { class: "product-detail--add-to-cart-btn form-button" },
            ["Add to Cart"],
            {
              click: () => {
                alert("Added to Cart");
              },
            }
          ).render();
          
        const buttonContainerDiv = new Component('div',{class:"cart-form--container"},[addToCartBtn]).render();

        this.node.append(inputContainerDiv,buttonContainerDiv);
        return this.node;
    }
}

// TESTING  - TO DELETE
let z = new CartForm({
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "rating": {
      "rate": 4.1,
      "count": 259
    }});
    console.log(z);
    document.getElementById("root").append(z.render());