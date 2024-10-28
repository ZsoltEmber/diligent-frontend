import { Component } from "../general.js";

export function createProductCard(product) {

    const productName = new Component("h4", { id: "product-name", class: "product-name" }, [product.title]).render()
    const productPrice = new Component("p", { id: "product-price", class: "product-price" }, [`Price: ${product.price}$`]).render()
    const productImage = new Component("img", { id: "product-img", class: "product-img", src: product.image }).render()
    const productDescription = new Component("p", { id: "product-desc", class: "product-desc" }, [product.description]).render()
    const cartBtn = new Component("button", { id: "cart-btn", class: "cart-btn card-btn" }, ["cart"]).render()
    const favBtn = new Component("button", { id: "fav-btn", class: "fav-btn card-btn" }, ["fav"]).render()
    

    const heart = "U+1F90D"
    const productDetailsContainerLeft = new Component("div", { id: "product-left-container", class: "product-left-container" }, [productImage]).render()
    const productDetailsContainerRight = new Component("div", { id: "product-right-container", class: "product-right-container" }, [productPrice, productDescription]).render()
    const productDetailsContainer = new Component("div", { id: "product-details-container", class: "product-details-container" }, [productDetailsContainerLeft, productDetailsContainerRight]).render()
    const buttonContainer = new Component("div", {id: "button-container", class:"button-container"}, [favBtn, cartBtn]).render()
    const productHeaderContainer = new Component("div", { id: "product-header-container", class: "product-header-container" }, [productName, buttonContainer]).render()
    const productCard = new Component("div", { id: "product-card", class: "product-card" }, [productHeaderContainer, productDetailsContainer])




    return productCard.render();
}