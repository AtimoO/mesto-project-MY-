// import
import { enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./utils.js";
import {
  popupViewImageElement,
  renderCard,
  handlerEditFormSubmit,
  handlerAddFormSubmit,
} from "./card.js";
import { closePopupInOverlay } from "./modal.js";

const optionsForm = {
  formSelector: ".popup__form",
  formFieldsetSelector: ".popup__form-set", // +
  inputSelector: ".popup__input",
  inputErrorInvalid: "popup__input_invalid", // +
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_inactive",
  errorClass: "popup__input-error_active",
};
const initialPlaces = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// popup Edit
export const popupEditElement = document.querySelector(".popup_edit");
const popupEditBtnClose = popupEditElement.querySelector(".popup__btn-close");
const formEditElement = popupEditElement.querySelector(".popup__form");
export const nameInput = formEditElement.querySelector("#name");
export const jobInput = formEditElement.querySelector("#job");
// popup Add
export const popupAddElement = document.querySelector(".popup_add");
const popupAddBtnClose = popupAddElement.querySelector(".popup__btn-close");
const formAddElement = popupAddElement.querySelector(".popup__form");
export const nameCardInput = formAddElement.querySelector("#name-card");
export const linkInput = formAddElement.querySelector("#link");
// popup View-image
const popupViewImageBtnClose =
  popupViewImageElement.querySelector(".popup__btn-close");
// profile
const profileElement = document.querySelector(".profile");
export const profileTitle = profileElement.querySelector(".profile__title");
export const profileSubtitle = profileElement.querySelector(".profile__subtitle");

const profileBtnEdit = profileElement.querySelector(".profile__edit");
const profileBtnAdd = profileElement.querySelector(".profile__add");

initialPlaces.forEach((place) => {
  renderCard(place.name, place.link);
});

profileBtnEdit.addEventListener("click", function () {
  openPopup(popupEditElement);
});
profileBtnAdd.addEventListener("click", function () {
  openPopup(popupAddElement);
});

popupEditBtnClose.addEventListener("click", function () {
  closePopup(popupEditElement);
});
popupAddBtnClose.addEventListener("click", function () {
  closePopup(popupAddElement);
});
popupViewImageBtnClose.addEventListener("click", function () {
  closePopup(popupViewImageElement);
});

// saveBtn popupEdit
formEditElement.addEventListener("submit", handlerEditFormSubmit);
// createBtn popupAdd
formAddElement.addEventListener("submit", handlerAddFormSubmit);

popupEditElement.addEventListener("mousedown", closePopupInOverlay);
popupAddElement.addEventListener("mousedown", closePopupInOverlay);
popupViewImageElement.addEventListener("mousedown", closePopupInOverlay);

enableValidation(optionsForm);
