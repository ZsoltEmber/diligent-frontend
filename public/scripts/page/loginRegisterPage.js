import { Component } from "../general.js";

export function createForm(formType = "login") {
  //formType = "login" or "registrate"

  const buttonTitle = formType === "login" ? "Login" : "Registrate";

  const emailInput = new Component(
    "input",
    {
      id: `${formType}-email`,
      class: `form-input`,
      type: "email",
    },
    []
  ).render();

  const emailLabel = new Component(
    "label",
    {
      id: `${formType}-email-label`,
      class: "form-label",
      for: `${formType}-email`,
    },
    ["Email:", emailInput]
  ).render();

  const passwordInput = new Component("input", {
    id: `${formType}-password`,
    class: "form-input",
    type: "password",
  }).render();
  const passwordLabel = new Component(
    "label",
    {
      id: `${formType}-password-label`,
      class: "form-label",
      for: `${formType}-password`,
    },
    ["Password:", passwordInput]
  ).render();

  const formButton = new Component(
    "button",
    { id: `${formType}-button`, class: "form-button" },
    [buttonTitle]
  ).render();

  const form = new Component(
    "form",
    { id: `${formType}-form`, class: "form-container" },
    [emailLabel, passwordLabel, formButton]
  ).render();

  const formWrapper = new Component(
    "div",
    { id: `${formType}-container`, class: "form-wrapper" },
    [form]
  );

  return formWrapper.render();
}
