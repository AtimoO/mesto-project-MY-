// import
import "./index.css";
import {
  optionsForm,
  initialPlaces,
  popups,
  popupEditElement,
  formEditElement,
  popupAddElement,
  formAddElement,
  profileBtnEdit,
  profileBtnAdd,
} from "../components/utils/constants.js";
import { enableValidation } from "../components/validate.js";
import { openPopup, closePopup } from "../components/utils.js";
import {
  renderCard,
  handlerEditFormSubmit,
  handlerAddFormSubmit,
} from "../components/card.js";

initialPlaces.forEach((place) => {
  renderCard(place.name, place.link);
});

profileBtnEdit.addEventListener("click", function () {
  openPopup(popupEditElement);
});
profileBtnAdd.addEventListener("click", function () {
  openPopup(popupAddElement);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
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

enableValidation(optionsForm);
