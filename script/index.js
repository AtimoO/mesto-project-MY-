const profileElement = document.querySelector('.profile'); // for btn edit and add
const profileBtnEdit = profileElement.querySelector('.profile__edit');

const placesElement = document.querySelector('.places'); // for btn like
const placesBtnLike = placesElement.querySelector('.places__btn-like');

const popupElement = document.querySelector('.popup'); // for btn close popup
const popupBtnClose = popupElement.querySelector('.popup__btn-close');
const formElement = popupElement.querySelector('.popup__form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');


placesBtnLike.addEventListener('click', function() {
  placesBtnLike.classList.toggle('places__btn-like_active');
});

profileBtnEdit.addEventListener('click', function () {
  popupElement.classList.add('popup_opened');
});

const pop = popupBtnClose.addEventListener('click', function () {
  popupElement.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileElement.querySelector('.profile__title').textContent = nameInput.value;
    profileElement.querySelector('.profile__subtitle').textContent = jobInput.value;
    pop();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);