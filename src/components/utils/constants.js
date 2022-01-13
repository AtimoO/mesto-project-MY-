export const optionsForm = {
  formSelector: ".popup__form",
  formFieldsetSelector: ".popup__form-set", // +
  inputSelector: ".popup__input",
  inputErrorInvalid: "popup__input_invalid", // +
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_inactive",
  errorClass: "popup__input-error_active",
};

export const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-5",
  headers: {
    authorization: "20520870-6cab-4f4f-bbfa-ddd25c12eab2",
    "Content-Type": "application/json",
  },
};

export const popups = document.querySelectorAll(".popup");
// popup Edit
export const popupEditElement = document.querySelector(".popup_edit");
export const formEditElement = popupEditElement.querySelector(".popup__form");
export const nameInput = formEditElement.querySelector("#name");
export const jobInput = formEditElement.querySelector("#job");
// popup Add
export const popupAddElement = document.querySelector(".popup_add");
export const formAddElement = popupAddElement.querySelector(".popup__form");
export const nameCardInput = formAddElement.querySelector("#name-card");
export const linkInput = formAddElement.querySelector("#link");
// popup update Photo
export const popupUpdatePhotoElement = document.querySelector('.popup_update-avatar');
export const formUpdatePhotoElement = popupUpdatePhotoElement.querySelector(".popup__form");
export const linkNewPhotoProfile = formUpdatePhotoElement.querySelector('#linkNewPhoto');
