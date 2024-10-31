import { loginWithEmailAndPassword, saveUserData } from "../client.js";
import { changeForm, validateForm } from "../utils.js";
import { Component } from "../general.js";
import { createMainPage } from "./mainPage.js";
import { createNavbar } from "../component/navbar.js";

export function createForm(formType = "login") {
  //formType = "login" or "registrate"

  const buttonTitle = formType === "login" ? "Login" : "Registrate";
  const formTitle = formType === "login" ? "Sign in" : "Create account";
  const formSubtitle =
    formType === "login" ? "Please enter your email and password." : "";
  const formFooterText = formType === "login" ? "Create account" : "Sign in";

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
    { id: `${formType}-button`, class: "form-button", type: "button" },
    [buttonTitle],
    {
      click: async () => {
        const isEmailValid = validateForm("email", emailInput.value);
        const isPasswordValid = validateForm("password", passwordInput.value);

        if (!isEmailValid || !isPasswordValid) return;

        if (formType === "registrate") {
          await saveUserData({
            email: emailInput.value,
            password: passwordInput.value,
          });
          await redirectToMainPage();
        }

        if (formType === "login") {
          await loginWithEmailAndPassword({
            email: emailInput.value,
            password: passwordInput.value,
          });
          await redirectToMainPage();
        }
      },
    }
  ).render();

  const form = new Component(
    "form",
    { id: `${formType}-form`, class: "form-container" },
    [emailLabel, passwordLabel, formButton]
  ).render();

  const footerText = new Component(
    "p",
    { id: "footer-text", class: "footer-text" },
    [formFooterText],
    {
      click: () => {
        changeForm(formType);
      },
    }
  ).render();

  const formFooter = new Component(
    "div",
    { id: "form-footer", class: "form-footer" },
    [footerText]
  ).render();

  const formWrapper = new Component(
    "div",
    { id: `${formType}-container`, class: "form-wrapper" },
    [formHeader, form, formFooter]
  );

  return formWrapper.render();
}

async function redirectToMainPage() {
  const root = document.getElementById("root");
  const mainPage = await createMainPage();
  root.innerHTML = "";
  root.append(mainPage);
}

export default function createLoginPage(formType){
  const formContainer = new Component('div',{class:"main"},[createNavbar(),createForm(formType)]).render();
  return formContainer;
}