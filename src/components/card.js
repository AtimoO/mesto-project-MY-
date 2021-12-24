import { openPopup, closePopup } from "./utils.js";
import {
  optionsForm,
  popupEditElement,
  nameInput,
  jobInput,
  popupAddElement,
  nameCardInput,
  linkInput,
  profileTitle,
  profileSubtitle,
} from "./utils/constants.js";

const popupViewImageElement = document.querySelector(".popup_view-image");
const popupImage = popupViewImageElement.querySelector(".popup__image");
const popupImageTitle = popupViewImageElement.querySelector(".popup__text");

const placesTemplate = document.querySelector("#places-template").content;

const placesElement = document.querySelector(".places");
const cardsContainer = placesElement.querySelector(".places__items");

function likeBtn(evt) {
  evt.target.classList.toggle("places__btn-like_active");
}

function removeCard(evt) {
  evt.target.parentElement.remove();
}

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
    .querySelector(`.${placesImage.className}`)
    .addEventListener("click", (evt) => {
      popupImageTitle.textContent = name;
      popupImage.src = link;
      popupImage.alt = name;
      openPopup(popupViewImageElement);
    });
  // Удаление карточки
  placesItemElement
    .querySelector(".places__btn-remove")
    .addEventListener("click", removeCard);
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
  const buttonElement = evt.target.querySelector(
    optionsForm.submitButtonSelector
  );
  buttonElement.classList.add(optionsForm.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
}

export {
  popupViewImageElement,
  renderCard,
  handlerEditFormSubmit,
  handlerAddFormSubmit,
};
