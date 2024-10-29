import { createForm } from "./page/loginRegisterPage.js";

/**
 * @param {string} tag - the tag of the html element
 * @param {Object} attributes - a key-value pair, representing html attributes for expl. {id:'idOfElement'}
 * @param {Array} attributes - an array of nodes (html elements) to append to the element as children
 * @param {Object} listenerObj - a key value pair, the key is the event name, value is the function to add as eventListener {'click':()=>{console.log('')}}
 */
export class Component {
  constructor(tag = "div", attributes = {}, children = [], listenerObj) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.listener = listenerObj; // {'click': ()=>{}}
    this.node = this.render(); // Only for developing reasons
  }

  render() {
    const node = document.createElement(this.tag);
    Object.keys(this.attributes).forEach((attrKey) =>
      node.setAttribute(attrKey, this.attributes[attrKey])
    );
    if (this.children && this.children.length) {
      this.children.forEach((child) => node.append(child));
    }

    if (this.listener) {
      Object.keys(this.listener).forEach((eventName) =>
        node.addEventListener(eventName, this.listener[eventName])
      );
    }

    return node;
  }
}

export function changeForm(formType) {
  const formToBeReplaced = document.getElementById(`${formType}-container`);
  formType = formType === "login" ? "registrate" : "login";
  const replacedForm = createForm(formType);
  formToBeReplaced.replaceWith(replacedForm);
}

export function validateForm(inputType, value) {
  if (inputType === "email") {
    if (!value) {
      alert("Provide an email address");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
      alert("Please provide a valid email address");
      return false;
    }
  }

  if (inputType === "password") {
    if (!value || value.length < 8) {
      alert("Password should be at least 8 characters long");
      return false;
    }
  }
  return true;
}
