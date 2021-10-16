// open/close (#1)
const popupElement = document.querySelector('.popup'); // for btn close popup
const popupBtnClose = popupElement.querySelector('.popup__btn-close');
const formElement = popupElement.querySelector('.popup__form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

const profileElement = document.querySelector('.profile'); // for btn edit and add
const profileBtnEdit = profileElement.querySelector('.profile__edit');

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

profileBtnEdit.addEventListener('click', function () {
  popupElement.classList.add('popup_opened');
});

popupBtnClose.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileElement.querySelector('.profile__title').textContent = nameInput.value;
  profileElement.querySelector('.profile__subtitle').textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); // Прикрепляем обработчик к форме


// create Cards (#2)
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const container = document.querySelector('.places');
const cardsContainer = container.querySelector('.places__items');

initialCards.forEach(item => {
  // тут можно будет вызвать функцию добавления карт
  addCard(item.name, item.link);
});



function addCard (name, link) {
  const placesTemplate = document.querySelector('#places-template').content; // получаем содержимое template
  const placesElement = placesTemplate.querySelector('.places__item').cloneNode(true); // копируем содержимое шаблона

  placesElement.querySelector('.places__title').textContent = name; // добавляем введенные значения
  placesElement.querySelector('.places__image').src = link; // добавляем
  placesElement.querySelector('.places__btn-like').addEventListener('click', function(evt) { // добавляем обработчик событий для клика
    evt.target.classList.toggle('places__btn-like_active'); // если такого класса нет, то добавляем, если есть удаляем
  });
  cardsContainer.append(placesElement); // добавляем в конец контейнера songsContainer
};



/*
function createCard(nameValue, linkValue) {
  ...
  const likeButton = cardsItem.querySelector('.card__like-button');
  ...

  deleteButton.addEventListener('click', function () {
    const currentItem = deleteButton.closest('.cards__item');
    currentItem.remove();
  });

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
}
*/