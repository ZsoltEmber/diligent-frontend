import { Component } from "../general.js";
import { createForm } from "../page/loginRegisterPage.js";
import { getCartContent } from "../cart.js";
import { createMainPage } from "../page/mainPage.js";
import { createCartPage } from "../page/cartPage.js";

export function createNavbar() {
    const homePageLink = new Component("span", { id: "homepage", class: "navbar-item home" }, ["Home"],{click:handleClickHome}).render();
    const registerLink = new Component("span", { id: "register-link", class: "navbar-item" }, ["register"], { click: () => handleClick("register") }).render();
    const loginLink = new Component("span", { id: "login-link", class: "navbar-item" }, ["login"], { click: () => handleClick("login") }).render();
    const cartLink = new Component("img", { id: "cart-icon", style:"margin-top:7px; margin-right:1rem", class: "cart-btn card-btn", src: chooseCartImage(), alt: "cart-icon" },[],{click: handleClickCart}).render();

    const leftContainer = new Component("div", { id: "nav-left", class: "nav-left" }, [homePageLink]).render()
    const rightContainer = new Component("div", { id: "nav-right", class: "nav-right" }, [registerLink, loginLink,cartLink]).render()


    const navbar = new Component("nav", { id: "navbar", class: "nav" }, [leftContainer, rightContainer]);
    return navbar.render();
}

function handleClick(formType) {
    const root = document.getElementById("root")
    root.innerHTML = "";
    root.append(createForm(formType))
}

function handleClickCart() {
    const root = document.getElementById("root")
    root.innerHTML = "";
    root.append(createCartPage());
}

const handleClickHome = async () => {
    const root = document.getElementById("root");
    root.innerHTML = "";
  const mainPage = await createMainPage()
  root.append(mainPage)
}

function chooseCartImage(){
   return getCartContent().length === 0? "../../styles/resource/shopping-cart-white.png":"../../styles/resource/shopping-cart-full.png"
}
