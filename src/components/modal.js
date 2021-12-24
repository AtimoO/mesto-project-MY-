import { closePopup } from "./utils.js";

function closePopupByEscape(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

export { closePopupByEscape };
