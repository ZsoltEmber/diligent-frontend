import { getCartContent } from "../cart.js";
import CartCard from "./cart-card.js";
import { Component } from "../general.js";
import { createNavbar } from "./navbar.js";

class CartPage{
  constructor(){
    this.totalPriceSpan = new Component('span',{class:"cart-list--total-info-total-price"},[`${this.getTotalPrice()}$`]).render();
    this.subTotalAmountSpan = new Component('span',{},[`${this.getTotalPrice()}$`]).render();
    this.node = new Component('div',{id:"cart-container", class:"cart-container"},[],{click:this.handleUpdateTotalAmount}).render();
  }

  getTotalPrice(){
    return getCartContent().reduce((accu,cartItem)=>{

      return accu + cartItem.price*cartItem.amount;
    },0).toFixed(2);
  }
  
  handleUpdateTotalAmount = (e) =>{
    if(e.target.tagName !== "BUTTON"){return};

    console.log(e.target.tagName);
    this.totalPriceSpan.innerText = this.getTotalPrice();
    this.subTotalAmountSpan.innerText = this.getTotalPrice();
  }
  

  render(){
    this.node.innerHTML = ''
    const navbar = createNavbar();
    //<h3>Subtotal:</h3>
    const subTotalH3 = new Component('h3',{},["Subtotal:"]).render();
    
    //<div class="cart-list--total-info-prices-container">
    const pricesContainer = new Component('div',{class:"cart-list--total-info-prices-container"},[subTotalH3,this.subTotalAmountSpan]).render()
    // <div class="cart-list--total-info-prices-container"> delivery
    const deliveryH3 = new Component('h3',{},["Delivery:"]).render();
    //<span>1.1$</span>
    const deliveryAmountSpan = new Component('span',{},["0$"]).render();
    const deviveryPriceContainer = new Component('div',{class:"cart-list--total-info-prices-container"},[deliveryH3,deliveryAmountSpan]).render()
    
    //         <h2>Total</h2>
    const totalPriceH2 = new Component('h2',{},["Total: "]).render();
    
    // <div class="cart-list--total-info-prices-container">
    const totalPriceContainer = new Component('div',{class:"cart-list--total-info-prices-container"},[totalPriceH2,this.totalPriceSpan]).render();
    //<button class="form-button">Checkout</button>
    const checkOutButton = new Component("button",{class:"form-button"},["Checkout"],{click:()=>{alert("This button should take you to the paying section!")}}).render()
    
    const totalInfoContainer = new Component('div',{id:"cart-list--total-info",
      class:"cart-list--total-info product-card"},[pricesContainer,deviveryPriceContainer,totalPriceContainer,checkOutButton]).render();
    
    const cartCards = getCartContent().map(cartItem =>new CartCard(cartItem).render());
    const productsContainer = new Component('div',{ class:"cart-list--products"},[...cartCards]).render()
    const listContainer = new Component('div',{class:"cart-list--container"},[productsContainer,totalInfoContainer]).render();
    
    this.node.append(
      navbar,
      listContainer
    )
    return this.node;
  }

}

export function createCartPage() {
  const cartPage = new CartPage().render();
  console.log(cartPage);
  return cartPage;
}

