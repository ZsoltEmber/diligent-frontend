import { Component } from "../general.js";

export function createLogin() {
  const emailLoginInput = new Component(
    "input",
    { id: "email-login-input", class: "login-email", type: "email" },
    []
  ).render();

  const emailLabel = new Component(
    "label",
    { id: "email-login-label", class: "email-label", for: "email-login-input" },
    ["Email:", emailLoginInput]
  ).render();

  const passwordLoginInput = new Component("input", {
    id: "password-login-input",
    class: "login-password",
    type: "password",
  }).render();
  const passwordLabel = new Component(
    "label",
    {
      id: "password-login-label",
      class: "password-label",
      for: "password-login-input",
    },
    ["Password:", passwordLoginInput]
  ).render();

  const loginButton = new Component(
    "button",
    { id: "login-button", class: "login-button" },
    ["Login"]
  ).render();

  const loginForm = new Component(
    "form",
    { id: "login-form", class: "login-form" },
    [emailLabel, passwordLabel, loginButton]
  ).render();

  const loginContainer = new Component(
    "div",
    { id: "login-container", class: "login-container" },
    [loginForm]
  );

  return loginContainer.render();
}
