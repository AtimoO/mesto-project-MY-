// import
import "./index.css";
import { loaderProfileInfo, currentUserId } from "../components/profile.js";
import {
  optionsForm,
  popups,
  popupEditElement,
  formEditElement,
  popupAddElement,
  popupUpdatePhotoElement,
  formAddElement,
  formUpdatePhotoElement,
} from "../components/utils/constants.js";
import {
  profileBtnUpdatePhoto,
  profileBtnEdit,
  profileBtnAdd,
} from "../components/profile.js";
import { enableValidation } from "../components/validate.js";
import { openPopup, closePopup } from "../components/utils.js";
import {
  renderCard,
  handlerEditFormSubmit,
  handlerUpdatePhotoFormSubmit,
  handlerAddFormSubmit,
} from "../components/card.js";
import { getCardsServer } from "../components/api.js";

loaderProfileInfo();

getCardsServer()
  .then((cards) => {
    cards.forEach((place) => {
      const liked = Boolean(
        place.likes.find((item) => item._id === currentUserId)
      );
      renderCard(
        place._id,
        place.name,
        place.link,
        place.likes.length,
        place.owner._id,
        liked
      );
    });
  })
  .catch((error) => console.log(error));
  console.log(currentUserId)

profileBtnEdit.addEventListener("click", () => {
  openPopup(popupEditElement);
});
profileBtnAdd.addEventListener("click", () => {
  openPopup(popupAddElement);
});
profileBtnUpdatePhoto.addEventListener("click", () => {
  openPopup(popupUpdatePhotoElement);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__btn-close")) {
      closePopup(popup);
    }
  });
});

formEditElement.addEventListener("submit", handlerEditFormSubmit);

formAddElement.addEventListener("submit", handlerAddFormSubmit);

formUpdatePhotoElement.addEventListener("submit", handlerUpdatePhotoFormSubmit);

enableValidation(optionsForm);
