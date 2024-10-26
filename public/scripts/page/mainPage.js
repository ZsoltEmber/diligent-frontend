import { Component } from "../general.js";
import { createNavbar } from "../component/navbar.js";

export function createMainPage(){
    const navbar = createNavbar()
    //TODO:implement list
    const mainPage =  new Component("div", {id: "main-page", class: "main"}, [navbar])
    return mainPage.render();
}

