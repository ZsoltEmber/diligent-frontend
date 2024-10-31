
import { createMainPage } from "./page/mainPage.js";

window.onload = async () => {
    const root = document.getElementById("root")
  const mainPage = await createMainPage()
  root.append(mainPage)
};
