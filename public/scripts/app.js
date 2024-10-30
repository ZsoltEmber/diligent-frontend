import { createCartPage } from "./component/cart-list.js";

window.onload = () => {
  console.log("hello world");
  document.getElementById('root').append(createCartPage());

};
