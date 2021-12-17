// blocks variables-----------------------------------------------
// popup Edit
const popupEditElement = document.querySelector('.popup_edit'); // можно взять из формы
const popupEditBtnClose = popupEditElement.querySelector('.popup__btn-close'); // можно взять из формы
const formEditElement = popupEditElement.querySelector('.popup__form'); // можно взять из формы
const nameInput = formEditElement.querySelector('#name'); // можно взять из формы
const jobInput = formEditElement.querySelector('#job'); // можно взять из формы
// popup Add
const popupAddElement = document.querySelector('.popup_add'); // можно взять из формы
const popupAddBtnClose = popupAddElement.querySelector('.popup__btn-close'); // можно взять из формы
const formAddElement = popupAddElement.querySelector('.popup__form'); // можно взять из формы
const nameCardInput = formAddElement.querySelector('#name-card'); // можно взять из формы
const linkInput = formAddElement.querySelector('#link'); // можно взять из формы
// popup View-image
const popupViewImageElement = document.querySelector('.popup_view-image');
const popupImage = popupViewImageElement.querySelector('.popup__image');
const popupImageTitle = popupViewImageElement.querySelector('.popup__text')
const popupViewImageBtnClose = popupViewImageElement.querySelector('.popup__btn-close')
// profile
const profileElement = document.querySelector('.profile');
const profileTitle = profileElement.querySelector('.profile__title');
const profileSubtitle = profileElement.querySelector('.profile__subtitle');
const profileBtnEdit = profileElement.querySelector('.profile__edit');
const profileBtnAdd = profileElement.querySelector('.profile__add');
// places
const placesElement = document.querySelector('.places');
const placesTemplate = document.querySelector('#places-template').content; // get template
const cardsContainer = placesElement.querySelector('.places__items');


// blocks functions ------------------------------------------------------
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function likeBtn (evt) {
  evt.target.classList.toggle('places__btn-like_active');
}

function addPlaces(name, link) {
  const placesItemElement = placesTemplate.querySelector('.places__item').cloneNode(true); // copy template
  placesItemElement.querySelector('.places__title').textContent = name;
  const placesImage = placesItemElement.querySelector('.places__image');
  placesImage.src = link;
  placesImage.alt = name;
  // likeBtn
  placesItemElement.querySelector('.places__btn-like').addEventListener('click', likeBtn);
  // popup view img
  placesItemElement.querySelector('.places__image').addEventListener('click', evt => {
    popupImageTitle.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    openPopup(popupViewImageElement);
  });
  // Удаление карточки
  placesItemElement.querySelector('.places__btn-remove').addEventListener('click', evt => {
    evt.target.parentElement.remove();
  });
  return placesItemElement;
};

function renderCard(name, link) {
  cardsContainer.prepend(addPlaces(name, link));
}

function handlerEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditElement);
}

function handlerAddFormSubmit(evt) {
  evt.preventDefault();
  renderCard(nameCardInput.value, linkInput.value)
  closePopup(popupAddElement);
  nameCardInput.value = '';
  linkInput.value = '';
}

// blocks EventListener --------------------------------------------------------------

profileBtnEdit.addEventListener('click', function () {
  openPopup(popupEditElement); // как то передать из формы
});
profileBtnAdd.addEventListener('click', function () {
  openPopup(popupAddElement); // как то передать из формы
});
popupEditBtnClose.addEventListener('click', function () {
  closePopup(popupEditElement); // как то передать из формы
});
popupAddBtnClose.addEventListener('click', function () {
  closePopup(popupAddElement); // как то передать из формы
});
popupViewImageBtnClose.addEventListener('click', function () {
  closePopup(popupViewImageElement);
});
// saveBtn popupEdit
formEditElement.addEventListener('submit', handlerEditFormSubmit); // Прикрепляем обработчик к форме
// createBtn popupAdd
formAddElement.addEventListener('submit', handlerAddFormSubmit);
// create initial cards
initialPlaces.forEach(place => {
  renderCard(place.name, place.link);
});


// esc ----------------------------------------------------------

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(evt.target.parentElement.parentElement.parentElement); // найти лучшее решение
  }
}

function closePopupOverlay (evt) {
  /* console.log(evt); */
}

popupEditElement.addEventListener('click', closePopupOverlay)
popupAddElement.addEventListener('click', closePopupOverlay)
popupViewImageElement.addEventListener('click', closePopupOverlay)

nameInput.addEventListener('keydown', closePopupByEsc)

jobInput.addEventListener('keydown', closePopupByEsc)

nameCardInput.addEventListener('keydown', closePopupByEsc)

linkInput.addEventListener('keydown', closePopupByEsc)


// valid -----------------------------------------------------------
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.prevenDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form-set'));
    fieldsetList.forEach(fieldsetElement => {
      setEventListeners(fieldsetElement);
    });
  });
};

// Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  const inputList = Array.from(formElement.querySelectorAll(".popup__form-input"));
  const buttonElement = formElement.querySelector('.popup__form-submit');
  // Это проверит состояние кнопки при первой загрузке страницы. Тогда кнопка перестанет быть активной до ввода данных в одно из полей.
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__form-submit_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__form-submit_inactive');
    buttonElement.removeAttribute('disabled');
  }
};

// Блокируем кнопку отправки формы
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    return !inputElement.validity.valid;
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__form-input_invalid");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form-input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__form-input_invalid");
  errorElement.classList.remove("popup__form-input-error_active");
  errorElement.textContent = "";
};

enableValidation();