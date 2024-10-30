import { getCartContent } from "../cart.js";
import CartCard from "./cart-card.js";

export function listCartCards() {
  getCartContent().forEach((cartItem) => {
    document.getElementById("root").append(new CartCard(cartItem).render());
  });
}

//$0.addEventListener('click',(e)=>{console.log(e.target.tagName)})