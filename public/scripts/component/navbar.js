import { Component } from "../general.js";
import { createForm } from "../page/loginRegisterPage.js";


export function createNavbar() {
    const homePageLink = new Component("span", { id: "homepage", class: "navbar-item home" }, ["Home"]).render();
    const registerLink = new Component("span", { id: "register-link", class: "navbar-item" }, ["register"], { click: () => handleClick("register") }).render();
    const loginLink = new Component("span", { id: "login-link", class: "navbar-item" }, ["login"], { click: () => handleClick("login") }).render();

    const leftContainer = new Component("div", { id: "nav-left", class: "nav-left" }, [homePageLink]).render()
    const rightContainer = new Component("div", { id: "nav-right", class: "nav-right" }, [registerLink, loginLink]).render()


    const navbar = new Component("nav", { id: "navbar", class: "nav" }, [leftContainer, rightContainer]);
    return navbar.render();
}

function handleClick(formType) {
    const root = document.getElementById("root")
    root.innerHTML = "";
    root.append(createForm(formType))
}