import { createCartPage } from "./page/cartPage.js";

window.onload = () => {
  console.log("hello world");
  document.getElementById('root').append(createCartPage());

};
