import { closePopupByEscape } from "./modal.js";

export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  window.addEventListener("keydown", closePopupByEscape);
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupByEscape);
}

export const setButtonState = (button, isSending) => {
  button.disabled = isSending;
  button.textContent = isSending ? "Сохранение..." : "Сохранить";
}
