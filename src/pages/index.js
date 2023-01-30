//Импорт массива изображений 
import initialCards from '../scripts/initialCards.js';
import config from '../scripts/config.js';
import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

// Попап редактирования профиля
const popupProfileElement = document.querySelector('.popup_type_profile'); // Нашли попап редактирования профиля в разметке.
const popupProfileOpenButtonElement = document.querySelector('.profile-info__edit-button'); // Нашли кнопку открытия попапа редактирования профиля.
const popupProfileFormElement = popupProfileElement.querySelector('.popup__form_type_profile'); //Нашли форму в попапе редактирования профиля
const nameInput = popupProfileFormElement.querySelector('input[name="name"]'); //Нашли инпут для имени в форме
const jobInput = popupProfileFormElement.querySelector('input[name="job"]'); //Нашли инпут для профессии в форме

// Попап добавления карточки
const popupCardElement = document.querySelector('.popup_type_card'); // Нашли попап добавления карточки в разметке.  
const popupCardOpenButtonElement = document.querySelector('.profile__add-button'); // Нашли кнопку открытия попапа добавления карточки
const popupСardFormElement = popupCardElement.querySelector('.popup__form_type_card'); //Нашли форму в попапе добавления карточки

// Попап обновления аватара
const profileImageElement = document.querySelector('.profile__avatar');



// Создаём функцию генерации (создания) карточки
const createCard = (item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '#element-template', handleOpenPopupImage, handleOpenPopupDeleteCard);

  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  return cardElement;
}

// #element-template-without-delete

// Создаём функцию генерации (создания) карточки без кнопки удаления карточки
const createCardWithoutDelete = (item) => {
  // Создадим экземпляр карточки
  const cardWithoutDelete = new Card(item, '#element-template-without-delete', handleOpenPopupImage, handleOpenPopupDeleteCard);

  // Создаём карточку и возвращаем наружу
  const cardWithoutDeleteElement = cardWithoutDelete.generateCard();

  return cardWithoutDeleteElement;
}


// Создаём эеземпляр класса Section, то есть списка карточек: 
// 1. С помощью функции createCard cоздаём и сохранякем в переменную карточку на основе объекта из 
// импортированного массива initialCards, который содержит объекты с полями name и link
// 2. Вставляем уже созданный функцией createCard готовый DOM-элемент карточки в список карточек (контейнер 
// с карточками) 
const cardList = new Section({
  renderer: (item) => {
    // Создаём новую карточку и готовим её к публикации (т. е. создаём уже готовый DOM-элемент карточки) 
    // с помощью функции createCard  
    const cardElement = createCard(item);
    // С помощью публичного метода addItem класса Section добавляем готовый DOM-элемент карточки в контейнер
    cardList.addItem(cardElement);
  },
},
  '.elements-list'
);

// С помощью публичного метода renderItems класса Section добавляем готовые DOM-элементы всех карточек в контейнер
cardList.renderItems(initialCards);

// Создаём экземпляр класса PopupWithImage для попапа с картинкой и устанавливаем слушателей в этот экземпляр 
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// Создаём функцию открытия попапа показа изображения по клике на картинку карточки
function handleOpenPopupImage(name, link) {
  popupImage.open(name, link);
}

// Создаём функцию открытия попапа удаления карточки по клике на кнопку удаления карточки
function handleOpenPopupDeleteCard() {
  popupDeleteCard.open();
}

// Создаём функцию сабмита попапа добавления карточки
const handleCardFormSubmit = (formValues) => {
  const cardItem = {
    name: formValues.place,
    link: formValues.url
  }
  const newCard = createCardWithoutDelete(cardItem);
  cardList.addItem(newCard);
  popupCard.close();
}

// Создаём функцию сабмита попапа удаления карточки
function handleDeleteCardSubmit() {
  cardElement.handleDeleteButtonClick();
}

// Создаём новый экземпляр класса UserInfo 
const userInfo = new UserInfo({ nameSelector: '.profile-info__name', infoSelector: '.profile-info__profession' });

// Создаём новый экземпляр класса PopupWithForm для попапа профиля и устанавливаем слушателей в этот экземпляр
const popupProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
popupProfile.setEventListeners();

// Создаём новый экземпляр класса PopupWithForm для попапа добавления карточки и устанавливаем слушателей в этот экземпляр
const popupCard = new PopupWithForm('.popup_type_card', handleCardFormSubmit);
popupCard.setEventListeners();

// Создаём новый экземпляр класса PopupWithConfirmation для попапа удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_type_delete-card', handleDeleteCardSubmit);
popupDeleteCard.setEventListeners();

// Создаём новый экземпляр класса PopupWithForm для попапа обновления аватара
const popupNewAvatar = new PopupWithForm('.popup_type_new-avatar');
popupNewAvatar.setEventListeners();

// Создаём функцию сабмита попапа профиля, которая вносит изменения в имя и профессию в блоке профиля, записывая 
// данные которые вписываются пользователем в инпуты в попапе профиля
function handleProfileFormSubmit(formValues) {
  userInfo.setUserInfo(formValues);
  popupProfile.close();
}

// Слушатели (обработчики) событий.

// Слушатель, который запускает функцию открытия попапа редактирования профиля по клику на кнопке edit и делает так,  
// чтобы инпуты в форме попапа приняли текстовые значения из блока профиля для имени и професии
popupProfileOpenButtonElement.addEventListener('click', function () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
  popupProfileFormValidator.resetValidation();
  popupProfile.open();
});

// Слушатель, который открывает попап добавления карточки по клику на кнопке add
popupCardOpenButtonElement.addEventListener('click', function () {
  popupCardFormValidator.resetValidation();
  popupCard.open();
});

// Слушатель, который открывает попап обновления аватара
profileImageElement.addEventListener('click', function () {
  popupNewAvatar.open();
});

// Запускаем валидацию на форму из попапа профиля
const popupProfileFormValidator = new FormValidator(config, popupProfileFormElement);
popupProfileFormValidator.enableValidation();
popupProfileFormValidator.resetValidation();

// Запускаем валидацию на форму из попапа добавления карточки
const popupCardFormValidator = new FormValidator(config, popupСardFormElement);
popupCardFormValidator.enableValidation();
popupCardFormValidator.resetValidation();



