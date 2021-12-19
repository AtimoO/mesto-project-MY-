// import
import { enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./utils.js";
import { likeBtn } from "./card.js";
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
const popupEditElement = document.querySelector(".popup_edit"); // можно взять из формы
const popupEditBtnClose = popupEditElement.querySelector(".popup__btn-close"); // можно взять из формы
const formEditElement = popupEditElement.querySelector(".popup__form"); // можно взять из формы
const nameInput = formEditElement.querySelector("#name"); // можно взять из формы
const jobInput = formEditElement.querySelector("#job"); // можно взять из формы
// popup Add
const popupAddElement = document.querySelector(".popup_add"); // можно взять из формы
const popupAddBtnClose = popupAddElement.querySelector(".popup__btn-close"); // можно взять из формы
const formAddElement = popupAddElement.querySelector(".popup__form"); // можно взять из формы
const nameCardInput = formAddElement.querySelector("#name-card"); // можно взять из формы
const linkInput = formAddElement.querySelector("#link"); // можно взять из формы
// popup View-image
const popupViewImageElement = document.querySelector(".popup_view-image");
const popupImage = popupViewImageElement.querySelector(".popup__image");
const popupImageTitle = popupViewImageElement.querySelector(".popup__text");
const popupViewImageBtnClose =
  popupViewImageElement.querySelector(".popup__btn-close");
// profile
const profileElement = document.querySelector(".profile");
const profileTitle = profileElement.querySelector(".profile__title");
const profileSubtitle = profileElement.querySelector(".profile__subtitle");
const profileBtnEdit = profileElement.querySelector(".profile__edit");
const profileBtnAdd = profileElement.querySelector(".profile__add");
// places
const placesTemplate = document.querySelector("#places-template").content; // get template
const placesElement = document.querySelector(".places");
const cardsContainer = placesElement.querySelector(".places__items");

function addCards(name, link) {
  const placesItemElement = placesTemplate
    .querySelector(".places__item")
    .cloneNode(true); // copy template
  placesItemElement.querySelector(".places__title").textContent = name;
  const placesImage = placesItemElement.querySelector(".places__image");
  placesImage.src = link;
  placesImage.alt = name;
  // likeBtn
  placesItemElement
    .querySelector(".places__btn-like")
    .addEventListener("click", likeBtn);
  // popup view img
  placesItemElement
    .querySelector(".places__image")
    .addEventListener("click", (evt) => {
      popupImageTitle.textContent = name;
      popupImage.src = link;
      popupImage.alt = name;
      openPopup(popupViewImageElement);
    });
  // Удаление карточки
  placesItemElement
    .querySelector(".places__btn-remove")
    .addEventListener("click", (evt) => {
      evt.target.parentElement.remove();
    });
  return placesItemElement;
}

function renderCard(name, link) {
  cardsContainer.prepend(addCards(name, link));
}

function handlerEditFormSubmit(evt) {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditElement);
}

function handlerAddFormSubmit(evt) {
  renderCard(nameCardInput.value, linkInput.value);
  closePopup(popupAddElement);
  nameCardInput.value = "";
  linkInput.value = "";
}

// close popup overlay and key = Escape

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(evt.target.form.parentElement.parentElement);
  }
}

// export

profileBtnEdit.addEventListener("click", function () {
  openPopup(popupEditElement); // как то передать из формы
});
profileBtnAdd.addEventListener("click", function () {
  openPopup(popupAddElement); // как то передать из формы
});
popupEditBtnClose.addEventListener("click", function () {
  closePopup(popupEditElement); // как то передать из формы
});
popupAddBtnClose.addEventListener("click", function () {
  closePopup(popupAddElement); // как то передать из формы
});
popupViewImageBtnClose.addEventListener("click", function () {
  closePopup(popupViewImageElement);
});
// saveBtn popupEdit
formEditElement.addEventListener("submit", handlerEditFormSubmit); // Прикрепляем обработчик к форме
// createBtn popupAdd
formAddElement.addEventListener("submit", handlerAddFormSubmit);
// create initial cards
initialPlaces.forEach((place) => {
  renderCard(place.name, place.link);
});

popupEditElement.addEventListener("mousedown", closePopupInOverlay);
popupAddElement.addEventListener("mousedown", closePopupInOverlay);
popupViewImageElement.addEventListener("mousedown", closePopupInOverlay);

nameInput.addEventListener("keydown", closePopupByEscape);
jobInput.addEventListener("keydown", closePopupByEscape);
nameCardInput.addEventListener("keydown", closePopupByEscape);
linkInput.addEventListener("keydown", closePopupByEscape);

enableValidation(optionsForm);
