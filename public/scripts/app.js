import { createProductCard } from "./component/product-card.js";
import { createProductList } from "./component/product-list.js";
import {Component} from "./general.js";

import { createForm } from "./page/loginRegisterPage.js";
import { createMainPage } from "./page/mainPage.js";

window.onload = async () => {
    const root = document.getElementById("root")
  const mainPage = await createMainPage()
  root.append(mainPage)
};
