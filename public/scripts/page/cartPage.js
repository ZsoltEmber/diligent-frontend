import { getCartContent } from "../cart.js";
import CartCard from "../component/cart-card.js";
import { Component } from "../general.js";
import { createNavbar } from "../component/navbar.js";

class CartPage{
  constructor(){
    this.DELIVERY_PRICE = 2.55;
    this.deliveryHomeInput = this.createDeliveryHomeInput();
    this.deliveryAmountSpan = new Component('span',{},[`${this.getDeliveryPrice()}$`]).render();
    this.totalPriceSpan = new Component('span',{class:"cart-list--total-info-total-price"},[`${this.getTotalPrice()}$`]).render();
    this.subTotalAmountSpan = new Component('span',{},[`${this.getSubTotalPrice().toFixed(2)}$`]).render();
    this.node = new Component('div',{id:"cart-container", class:"cart-container"},[],{click:this.handleUpdateTotalAmount}).render();
  }

  createDeliveryHomeInput(){
    const deliveryHomeInput = new Component('input',{id:"delivery-type--home", type:"radio", name:"delivery-type", value:"1"},[],{"change":this.handleChangeDeliveryType}).render();    
        deliveryHomeInput.checked = true;
        return deliveryHomeInput;
  }
  
  getSubTotalPrice(){
    return getCartContent().reduce((accu,cartItem)=>{
      return accu + cartItem.price*cartItem.amount;
    },0);
  }

  getDeliveryPrice(){
    return this.deliveryHomeInput.checked? this.DELIVERY_PRICE : 0;
  }
  
  getTotalPrice(){
    return (this.getDeliveryPrice() + this.getSubTotalPrice()).toFixed(2);
  }

  handleChangeDeliveryType = () =>{
      this.deliveryAmountSpan.innerText =  `${this.getDeliveryPrice()}$`;
      this.updateTotalAmount();
  }

  updateTotalAmount(){
    this.totalPriceSpan.innerText = `${this.getTotalPrice()}$`;
    this.subTotalAmountSpan.innerText = `${this.getSubTotalPrice().toFixed(2)}$`;
  }

  handleUpdateTotalAmount = (e) =>{
    if(e.target.tagName !== "BUTTON"){return};
    this.updateTotalAmount();
  }
  

  render(){
    this.node.innerHTML = ''
    const navbar = createNavbar();
  const deliveryHomeLabel = new Component('label',{},[this.deliveryHomeInput,' Home delivery']).render();    
  const deliveryClickAndCollect = new Component('input',{id:"delivery-type--click-and-collect", type:"radio", name:"delivery-type", value:"0"},[]).render();    
  const deliveryClickAndCollectLabel = new Component('label',{},[deliveryClickAndCollect,' Click & Collect'],{'change':this.handleChangeDeliveryType}).render();
    const deliveryContainer = new Component('form',{class:"cart-list--total-info-delivery-container"},[deliveryHomeLabel,deliveryClickAndCollectLabel]).render();   
    const seperateDeliveryHr = new Component('hr',{},[]).render();    
  
    const subTotalH3 = new Component('h3',{},["Subtotal:"]).render();
    const pricesContainer = new Component('div',{class:"cart-list--total-info-prices-container"},[subTotalH3,this.subTotalAmountSpan]).render()
    const deliveryH3 = new Component('h3',{},["Delivery:"]).render();
    const deviveryPriceContainer = new Component('div',{class:"cart-list--total-info-prices-container"},[deliveryH3,this.deliveryAmountSpan]).render()
    const totalPriceH2 = new Component('h2',{},["Total: "]).render();
    const totalPriceContainer = new Component('div',{class:"cart-list--total-info-prices-container"},[totalPriceH2,this.totalPriceSpan]).render();
    const checkOutButton = new Component("button",{class:"form-button"},["Checkout"],{click:()=>{alert("This button should take you to the paying section!")}}).render()
    
    const totalInfoContainer = new Component('div',{id:"cart-list--total-info",
      class:"cart-list--total-info product-card"},[deliveryContainer,seperateDeliveryHr,pricesContainer,deviveryPriceContainer,totalPriceContainer,checkOutButton]).render();
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
getCartContent()
  let cartPage; 
  if(getCartContent().length){
    cartPage = new CartPage().render();
  } else {
    const messageH3 = new Component('h3',{},['Your cart is empty. Please visit "Home", and browse our catalog to discover your next favorite item. ']).render();
    const messageContainer = new Component('div',{class:"cart-list--container"},[messageH3]).render();
    cartPage = new Component('div',{id:"cart-container", class:"cart-container"},[createNavbar(),messageContainer]).render();
    }
  return cartPage;
}

