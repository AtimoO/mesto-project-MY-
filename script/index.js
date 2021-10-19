// popup Edit
const popupEditElement = document.querySelector('.popup_edit');
const popupEditBtnClose = popupEditElement.querySelector('.popup__btn-close');
const formEditElement = popupEditElement.querySelector('.popup__form');
const nameInput = formEditElement.querySelector('#name');
const jobInput = formEditElement.querySelector('#job');

// popup Add
const popupAddElement = document.querySelector('.popup_add');
const popupAddBtnClose = popupAddElement.querySelector('.popup__btn-close');
const formAddElement = popupAddElement.querySelector('.popup__form');
const nameCardInput = formAddElement.querySelector('#name-card');
const linkInput = formAddElement.querySelector('#link');

// popup View-image
const popupViewImageElement = document.querySelector('.popup_view-image');
const popupViewImageBtnClose = popupViewImageElement.querySelector('.popup__btn-close')

// profile
const profileElement = document.querySelector('.profile'); // for btn edit and add
const profileBtnEdit = profileElement.querySelector('.profile__edit');
const profileBtnAdd = profileElement.querySelector('.profile__add');
// places
const placesElement = document.querySelector('.places');
const cardsContainer = placesElement.querySelector('.places__items');

// open/close popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

profileBtnEdit.addEventListener('click', function () {
  openPopup(popupEditElement);
});
profileBtnAdd.addEventListener('click', function () {
  openPopup(popupAddElement);
});

popupEditBtnClose.addEventListener('click', function () {
  closePopup(popupEditElement);
});
popupAddBtnClose.addEventListener('click', function () {
  closePopup(popupAddElement);
});
popupViewImageBtnClose.addEventListener('click', function () {
  closePopup(popupViewImageElement);
});

// saveBtn popupEdit
function formEditSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileElement.querySelector('.profile__title').textContent = nameInput.value;
  profileElement.querySelector('.profile__subtitle').textContent = jobInput.value;
  closePopup(popupEditElement);
}

formEditElement.addEventListener('submit', formEditSubmitHandler); // Прикрепляем обработчик к форме

function addPlaces(name, link) {
  const placesTemplate = document.querySelector('#places-template').content; // получаем содержимое template
  const placesElement = placesTemplate.querySelector('.places__item').cloneNode(true); // копируем содержимое шаблона
  placesElement.querySelector('.places__title').textContent = name;
  placesElement.querySelector('.places__image').src = link;
  placesElement.querySelector('.places__image').alt = name;

  placesElement.querySelector('.places__btn-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('places__btn-like_active');
  });
  // popup view img
  placesElement.querySelector('.places__image').addEventListener('click', function (evt) {
    const popupImage = popupViewImageElement.querySelector('.popup__image');
    popupViewImageElement.querySelector('.popup__text').textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    openPopup(popupViewImageElement);
  });
  // Удаление карточки
  placesElement.querySelector('.places__btn-remove').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  cardsContainer.prepend(placesElement); // добавляем в начало контейнера
};

// create initial cards
initialPlaces.forEach(item => {
  addPlaces(item.name, item.link);
});

// createBtn popupAdd
function formAddSubmitHandler(evt) {
  evt.preventDefault();
  addPlaces(nameCardInput.value, linkInput.value);
  closePopup(popupAddElement);
  nameCardInput.value = '';
  linkInput.value = '';
}

formAddElement.addEventListener('submit', formAddSubmitHandler);
