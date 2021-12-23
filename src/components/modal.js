import { closePopup } from "./utils.js";
import { popupViewImageElement } from "./card.js";
import { popupEditElement, popupAddElement } from "../pages/index.js";

function closePopupInOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(popupEditElement);
    closePopup(popupAddElement);
    closePopup(popupViewImageElement);
  }
}

export { closePopupInOverlay, closePopupByEscape };
