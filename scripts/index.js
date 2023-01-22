//Импорт массива изображений 
import initialCards from './initialCards.js';
import config from './config.js';
import {Card} from './Сard.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js'

//Попап редактирования профиля
const popupProfileElement = document.querySelector('.popup_type_profile'); //Нашли попап редактирования профиля в разметке.
const popupProfileOpenButtonElement = document.querySelector('.profile-info__edit-button'); // Нашли кнопку открытия попапа редактирования профиля.
const profileNameElement = document.querySelector('.profile-info__name'); //Нашли строку с именем профиля в блоке профиля.
const profileProfessionElement = document.querySelector('.profile-info__profession'); //Нашли строку с профессией профиля в блоке профиля.
const popupProfileFormElement = popupProfileElement.querySelector('.popup__form_type_profile'); //Нашли форму в попапе редактирования профиля
const nameInput = popupProfileFormElement.querySelector('input[name="name"]'); //Нашли инпут для имени в форме
const jobInput = popupProfileFormElement.querySelector('input[name="job"]'); //Нашли инпут для профессии в форме

//Попап добавления карточки
const popupCardElement = document.querySelector('.popup_type_card'); //Нашли попап добавления карточки в разметке.  
const popupCardOpenButtonElement = document.querySelector('.profile__add-button'); // Нашли кнопку открытия попапа добавления карточки
const popupСardFormElement = popupCardElement.querySelector('.popup__form_type_card');
const placeInput = popupСardFormElement.querySelector('input[name="place"]');
const urlInput = popupСardFormElement.querySelector('input[name="url"]');


//Вставка карточек из импортированного массива initialCardsб который содержит объекты с полями name и link
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    // Создадим экземпляр карточки
  const card = new Card(item, '#element-template', handleOpenPopupImage);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // С помощью публичного метода addItem класса Section добавляем готовый DOM-элемент карточки в контейнер
  cardList.addItem(cardElement);
    },
  },
  '.elements-list'
);

// С помощью публичного метода renderItems класса Section добавляем готовые DOM-элементы всех карточек в контейнер
cardList.renderItems();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

//Создаём функцию открытия попапа показа изображения по клике на картинку карточки
function handleOpenPopupImage(name, link) {
  popupImage.open(name, link);
}


const userInfo = new UserInfo({ nameSelector: '.profile-info__name', infoSelector: '.profile-info__profession'});

const popupProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
popupProfile.setEventListeners();

const popupCard = new PopupWithForm('.popup_type_card');
popupCard.setEventListeners();



// Функция, которая вносит изменения в имя и профессию в блоке профиля, записывая данные которые вписываются в инпуты в попапе
function handleProfileFormSubmit(formValues) {
  userInfo.setUserInfo(formValues);
  popupProfile.close();
}

const handleCardFormSubmit = (formValues) => {
  const elementElement = {
    name: placeInput.value,
    link: urlInput.value
  }
  cardList.addItem(elementElement);
  popupCard.close();
  e.target.reset();
  e.submitter.classList.add('popup__save_disabled');
  e.submitter.setAttribute('disabled', true);
}

//Слушатели (обработчики) событий.

// Слушатель, который запускает функцию открытия попапа редактирования профиля по клику на кнопке edit и делает так,  
// чтобы инпуты в форме попапа приняли текстовые значения из блока профиля для имени и професии
popupProfileOpenButtonElement.addEventListener('click', function () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
  popupProfile.open();
});

//Слушатель, который открывает попап добавления карточки по клику на кнопке add
popupCardOpenButtonElement.addEventListener('click', function () {
  popupCard.open();
});

//Запускаем валидацию на форму из попапа профиля
const popupProfileFormValidator = new FormValidator(config, popupProfileFormElement);
popupProfileFormValidator.enableValidation();

//Запускаем валидацию на форму из попапа добавления карточки
const popupCardFormValidator = new FormValidator(config, popupСardFormElement);
popupCardFormValidator.enableValidation();



