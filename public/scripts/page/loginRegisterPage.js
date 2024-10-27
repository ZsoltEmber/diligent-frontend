import { Component } from "../general.js";

export function createForm(formType = "login") {
  //formType = "login" or "registrate"

  const buttonTitle = formType === "login" ? "Login" : "Registrate";
  const formTitle = formType === "login" ? "Sign in" : "Create account";
  const formSubtitle =
    formType === "login" ? "Please enter your email and password." : "";

  const headerTitle = new Component(
    "h2",
    { id: "header-title", class: "header-title" },
    [formTitle]
  ).render();

  const headerSubtitle = new Component(
    "p",
    { id: "header-subtitle", class: "header-subtitle" },
    [formSubtitle]
  ).render();

  const formHeader = new Component(
    "div",
    { id: "form-header", class: "form-header" },
    [headerTitle, headerSubtitle]
  ).render();

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
    [formHeader, form]
  );

  return formWrapper.render();
}