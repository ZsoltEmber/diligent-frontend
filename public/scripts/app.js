import {Component} from "./general.js";

import { createForm } from "./page/loginRegisterPage.js";


window.onload = () => {
  console.log("hello world");
  document.body.append(createForm());
};
