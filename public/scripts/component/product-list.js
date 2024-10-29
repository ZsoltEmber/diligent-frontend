import { fetchData } from "../client.js";
import { Component } from "../general.js";
import { createProductCard } from "./product-card.js";



export async function createProductList(){

    const productList = await fetchData()
    const productCards = productList.map((product) => createProductCard(product))
    const container = new Component("div", {id: "product-list", class: "product-list"}, productCards)
    return container.render();
}