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
  placesItemElement.querySelector('.places__image').addEventListener('click', function (evt) {
    popupImageTitle.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    openPopup(popupViewImageElement);
  });
  // Удаление карточки
  placesItemElement.querySelector('.places__btn-remove').addEventListener('click', function (evt) {
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

// open/close popup
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
formEditElement.addEventListener('submit', handlerEditFormSubmit); // Прикрепляем обработчик к форме
// createBtn popupAdd
formAddElement.addEventListener('submit', handlerAddFormSubmit);
// create initial cards
initialPlaces.forEach(item => {
  renderCard(item.name, item.link);
});
