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

const popups = document.querySelectorAll('.popup')
// popup Edit
const popupEditElement = document.querySelector(".popup_edit");
const formEditElement = popupEditElement.querySelector(".popup__form");
const nameInput = formEditElement.querySelector("#name");
const jobInput = formEditElement.querySelector("#job");
// popup Add
const popupAddElement = document.querySelector(".popup_add");
const formAddElement = popupAddElement.querySelector(".popup__form");
const nameCardInput = formAddElement.querySelector("#name-card");
const linkInput = formAddElement.querySelector("#link");
// profile
const profileElement = document.querySelector(".profile");
const profileTitle = profileElement.querySelector(".profile__title");
const profileSubtitle = profileElement.querySelector(".profile__subtitle");

const profileBtnEdit = profileElement.querySelector(".profile__edit");
const profileBtnAdd = profileElement.querySelector(".profile__add");

export {
  optionsForm,
  initialPlaces,
  popups,
  popupEditElement,
  formEditElement,
  nameInput,
  jobInput,
  popupAddElement,
  formAddElement,
  nameCardInput,
  linkInput,
  profileTitle,
  profileSubtitle,
  profileBtnEdit,
  profileBtnAdd,
};
