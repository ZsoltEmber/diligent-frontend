import { Component } from "../general.js";
import { createNavbar } from "../component/navbar.js";
import { createProductList } from "../component/product-list.js";

export async function createMainPage(){
    const navbar = createNavbar()
    //TODO:implement list
    const productList = await createProductList()
    const mainPage =  new Component("div", {id: "main-page", class: "main"}, [navbar, productList])
    return mainPage.render();
}

