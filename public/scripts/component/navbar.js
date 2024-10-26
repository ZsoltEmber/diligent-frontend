import { Component } from "../general.js";


export function createNavbar(){
    const navbar =  new Component("nav", {id: "navbar", class: "nav"});
    return navbar.render();
}