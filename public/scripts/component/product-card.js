import { Component } from "../general.js";

export function createProductCard(product){

   const productName = new Component("h4", {id: "product-name", class: "product-name"}, [product.title]).render()
   const productPrice = new Component("p", {id: "product-price", class: "product-price"}, [`Price: ${product.price}$`]).render()
   const productImage = new Component("img", {id: "product-img", class: "product-img", src: product.image}).render()
   const productDescription = new Component("p", {id: "product-desc", class: "product-desc"}, [product.description]).render()

   const productDetailsContainerLeft = new Component("div", {id: "product-left-container", class: "product-left-container"}, [productImage]).render()
   const productDetailsContainerRight = new Component("div", {id: "product-right-container", class: "product-right-container"}, [productPrice, productDescription]).render()
   const productDetailsContainer = new Component("div", {id: "product-details-container", class: "product-details-container"}, [productDetailsContainerLeft, productDetailsContainerRight]).render()

   const productCard = new Component("div", {id: "product-card", class: "product-card"}, [productName, productDetailsContainer])




    return productCard.render();
}