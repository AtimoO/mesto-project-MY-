import { closePopupByEscape } from "./modal.js";

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  window.addEventListener("keydown", closePopupByEscape);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupByEscape);
}

export { openPopup, closePopup };
