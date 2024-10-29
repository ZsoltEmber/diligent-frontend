import { createForm } from "./page/loginRegisterPage.js";

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
