import { closePopup } from './utils.js';

function closePopupInOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

export { closePopupInOverlay };
