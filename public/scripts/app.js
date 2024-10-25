import {Component} from "./general.js";

window.onload = () => {
  console.log("hello world");
  const text = new Component("p", {}, ["Valami", "semmi"]);
  const newComp = new Component(
    "p",
    { id: "component-id", class: "egyik másik harmadik" },
    ["Szöveg", text.render()],
    {
      click: () => {
        console.log("klikk");
      },
    }
  );
  console.log(newComp.render());
  document.body.append(newComp.render());
};
