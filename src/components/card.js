import { openPopup, closePopup, setButtonState } from "./utils.js";
import {
  optionsForm,
  popupEditElement,
  nameInput,
  jobInput,
  popupAddElement,
  nameCardInput,
  linkInput,
  popupUpdatePhotoElement,
  linkNewPhotoProfile,
} from "./utils/constants.js";
import { profilePhoto, profileTitle, profileSubtitle } from "./profile.js";
import {
  sendDataProfile,
  addCardServer,
  removeCardServer,
  addLike,
  removeLike,
  updatePhotoProfile,
} from "./api.js";
import { currentUserId } from "./profile.js";

export const popupViewImageElement =
  document.querySelector(".popup_view-image");
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

function addCards(idCard, nameCard, link, likes, idAuthor, liked) {
  const placesItemElement = placesTemplate
    .querySelector(".places__item")
    .cloneNode(true); // copy template
  placesItemElement.idCard = idCard;
  placesItemElement.querySelector(".places__title").textContent = nameCard;
  const likesCounter = placesItemElement.querySelector(".places__sum-like");
  likesCounter.textContent = likes;
  const placesImage = placesItemElement.querySelector(".places__image");
  placesImage.src = link;
  placesImage.alt = nameCard;
  // popup view img
  placesImage.addEventListener("click", (evt) => {
    popupImageTitle.textContent = nameCard;
    popupImage.src = link;
    popupImage.alt = nameCard;
    openPopup(popupViewImageElement);
  });
  // likeBtn
  if (liked) {
    const likeBtn = placesItemElement.querySelector(".places__btn-like");
    likeBtn.classList.add("places__btn-like_active");
  }
  placesItemElement
    .querySelector(".places__btn-like")
    .addEventListener("click", (evt) => {
      if (!evt.target.classList.contains("places__btn-like_active")) {
        addLike(placesItemElement.idCard)
          .then((data) => {
            likesCounter.textContent = data.likes.length;
            likeBtn(evt);
          })
          .catch((error) => console.log(error));
      } else {
        removeLike(placesItemElement.idCard)
          .then((data) => {
            likesCounter.textContent = data.likes.length;
            likeBtn(evt);
          })
          .catch((error) => console.log(error));
      }
    });
  // Удаление карточки
  if (currentUserId !== idAuthor) {
    const removeBtn = placesItemElement.querySelector(".places__btn-remove");
    removeBtn.classList.add("places__btn-remove_inactive");
  }
  placesItemElement
    .querySelector(".places__btn-remove")
    .addEventListener("click", (evt) => {
      removeCardServer(placesItemElement.idCard)
        .then(() => removeCard(evt))
        .catch((error) => console.log(error));
    });

  return placesItemElement;
}

export function renderCard(idCard, nameCard, link, likes, idAuthor, liked) {
  cardsContainer.prepend(
    addCards(idCard, nameCard, link, likes, idAuthor, liked)
  );
}

export function handlerEditFormSubmit(evt) {
  setButtonState(evt.submitter, true);
  sendDataProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileSubtitle.textContent = jobInput.value;
      closePopup(popupEditElement);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setButtonState(evt.submitter, false);
    });
}

export function handlerUpdatePhotoFormSubmit(evt) {
  setButtonState(evt.submitter, true);
  updatePhotoProfile(linkNewPhotoProfile.value)
    .then((infoProfile) => {
      profilePhoto.src = infoProfile.avatar;
      closePopup(popupUpdatePhotoElement);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setButtonState(evt.submitter, false);
    });
}

export function handlerAddFormSubmit(evt) {
  evt.submitter.textContent = "Создание...";
  addCardServer(nameCardInput.value, linkInput.value)
    .then((card) => {
      renderCard(card._id, card.name, card.link, card.likes.length, card.owner._id, false);
      nameCardInput.value = "";
      linkInput.value = "";
      evt.submitter.classList.add(optionsForm.inactiveButtonClass);
      evt.submitter.setAttribute("disabled", true);
      closePopup(popupAddElement);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      evt.submitter.textContent = "Создать"
    });
}
