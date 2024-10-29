import {createMainPage} from "./page/mainPage.js"



window.onload = () => {
  
  createMainPage().then(page=> document.getElementById('root').append(page));
};
