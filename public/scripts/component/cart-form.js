import { findInCartById,addToCart } from "../cart.js";
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
    this.isAddedToCart = false;
    this.node = new Component('form',{class:"cart-form--form"}).render();
    }
    handleAddToCart =(event)=>{
        event.preventDefault();
        this.amount = parseInt(this.inputField.value);
        addToCart(this.product, this.amount);
        this.isAddedToCart = true;
        this.render();
        this.isAddedToCart = false;
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
        this.node.innerHTML = '';
        const labelForInput = new Component('label',{for:`amount-of-${this.product.title}`},["Amount:  ",this.inputField]).render();
        const inputContainerDiv = new Component('div',{class:"cart-form--container"},[labelForInput]).render();
        
        const addToCartBtn = new Component(
            "button",
            { class: "product-detail--add-to-cart-btn form-button" },
            ["Add to Cart"],
            {click:this.handleAddToCart},
          ).render();
          
        const buttonContainerDiv = new Component('div',{class:"cart-form--container"},[addToCartBtn]).render();

        const userFeedbackP = this.isAddedToCart
        ? new Component('p',{class:"quick-feedback"},["Product added to Cart!"]).render()
        : '';

        this.node.append(userFeedbackP,inputContainerDiv,buttonContainerDiv);
        return this.node;
    }
}
