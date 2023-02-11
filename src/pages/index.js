// Импорты
// _______________________________________________________________________________________________________________

import './index.css';
import config from '../scripts/config.js';
import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';


// Константы (переменные)
// _______________________________________________________________________________________________________________

// Попап редактирования профиля
const popupProfileOpenButtonElement = document.querySelector('.profile-info__edit-button'); // Нашли кнопку открытия попапа редактирования профиля.
const popupProfileFormElement = document.forms["profile-popupform"]; //Нашли форму в попапе редактирования профиля

// Попап добавления карточки  
const popupCardOpenButtonElement = document.querySelector('.profile__add-button'); // Нашли кнопку открытия попапа добавления карточки
const popupСardFormElement = document.forms["card-popupform"]; //Нашли форму в попапе добавления карточки

// Попап обновления аватара
const profileImageElement = document.querySelector('.profile__avatar'); // Нашли аватар в блоке профиля
const popupNewAvatarFormElement = document.forms['new-avatar-popupform']; // Нашли форму в попапе обновления аватара

// Попап просмотра аватара
const profileNameElement = document.querySelector('.profile-info__name'); // Нашли элемент с именем пользователя в блоке профиля

// Взаимодействие с API
// _______________________________________________________________________________________________________________

// Создаём экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'cfebb862-70aa-4cd6-a9bd-6d5609babeaa',
    'Content-Type': 'application/json'
  }
});

// Создаём Promise.all для загрузки информации о пользователе и массива карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData); // С помощью публичного метода setUserInfo класса UserInfo принимаем новые данные 
    // пользователя и добавляем их на страницу.
    cardList.renderItems(cards); // С помощью публичного метода renderItems класса Section добавляем готовые
    // DOM-элементы всех карточек в контейнер
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


// Создание карточек
// _______________________________________________________________________________________________________________

// Создаём эеземпляр класса Section, то есть списка карточек: 
// С помощью функции renderer cоздаём и возвращаем экземпляр карточки на основе объекта из массива карточек,
// полученных с сервера. Этот массив содержит 30 последних карточек, созданных пользователями на сервере. Каждая 
// карточка представляет с собой объект с полями name и link.
const cardList = new Section({
  renderer: (item) => {
    // Создадим экземпляр карточки
    const card = new Card(item, '#element-template', handleCardClick, handleDeleteClick, handleLikeClick, userInfo.getId());

    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();

    return cardElement;
    // С помощью публичного метода addItem класса Section добавляем готовый DOM-элемент карточки в контейнер,
    // в качестве аргумента передаём вызов функции createCard, которая создаёт новую карточку и готовит её к 
    // публикации (т. е. создаёт уже готовый DOM-элемент карточки)
    // cardList.addItem(createCard(item));
  },
},
  '.elements-list'
);


// Функции для попапов и лайков
// _______________________________________________________________________________________________________________

// Создаём функцию открытия попапа показа изображения по клике на картинку карточки
function handleCardClick(name, link) {
  popupImage.open(name, link);
};

// Создаём функцию открытия попапа удаления карточки по клике на кнопку удаления карточки
function handleDeleteClick(card) {
  popupDeleteCard.open(card);
};

// Создаём функцию сабмита для попапа профиля, которая вносит изменения в имя и профессию в блоке профиля, записывая 
// данные которые вписываются пользователем в инпуты в попапе профиля
const handleProfileFormSubmit = (formValues) => {
  popupProfile.renderLoading(true);
  popupProfile.disableSubmitButton();
  api.editProfile(formValues)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupProfile.renderLoading(true, 'Сохранено!');
      setTimeout(() => popupProfile.close(), 1000);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
      popupProfile.renderLoading(true, 'Ошибка запроса!');
    })
    .finally(() => { // В любом случае
      setTimeout(() => {
        popupProfile.enableSubmitButton();
        popupProfile.renderLoading(false);
      },
        1500);
    });
};

// Создаём функцию сабмита для попапа добавления карточки
const handleCardFormSubmit = (formValues) => {
  popupCard.renderLoading(true);
  popupCard.disableSubmitButton();
  api.addNewCard(formValues)
    .then((cardData) => {
      popupCard.renderLoading(true, 'Создано!');
      cardList.addItem(cardData);
      setTimeout(() => popupCard.close(), 1000);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
      popupCard.renderLoading(true, 'Ошибка запроса!');
    })
    .finally(() => { // В любом случае
      setTimeout(() => {
        popupCard.enableSubmitButton();
        popupCard.renderLoading(false);
      },
        1500)
    });
};

// Создаём функцию сабмита попапа для удаления карточки
const handleDeleteCardFormSubmit = (card) => {
  popupDeleteCard.renderLoading(true);
  popupDeleteCard.disableSubmitButton();
  api.deleteCard(card._id)
    .then(() => {
      popupDeleteCard.renderLoading(true, 'Удалено!');
      card.handleDeleteButtonClick();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => { // В любом случае
      setTimeout(() => {
        popupDeleteCard.enableSubmitButton();
        popupDeleteCard.renderLoading(false);
      },
        1500)
    });
};

// Создаём функцию сабмита попапа для обновления аватара пользователя
const handleNewAvatarFormSubmit = (formValues) => {
  popupNewAvatar.renderLoading(true);
  popupNewAvatar.disableSubmitButton();
  api.addNewAvatar(formValues)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupNewAvatar.renderLoading(true, 'Сохранено!');
      setTimeout(() => popupNewAvatar.close(), 1000);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
      popupNewAvatar.renderLoading(true, 'Ошибка запроса!');
    })
    .finally(() => { // В любом случае
      setTimeout(() => {
        popupNewAvatar.enableSubmitButton();
        popupNewAvatar.renderLoading(false);
      },
        1500)
    });
};

// Создаём функцию постановки/снятия лайка
const handleLikeClick = (cardId, card) => {
  const method = card.isLiked() ? 'DELETE' : 'PUT'
  api.setLike(cardId, method)
    .then((res) => {
      card.handleLikeButtonClick();
      card.setLikesValue(res.likes);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
};


// Создание экземпляров классов для попапов
// _______________________________________________________________________________________________________________

// Создаём новый экземпляр класса UserInfo 
const userInfo = new UserInfo({ nameSelector: '.profile-info__name', infoSelector: '.profile-info__profession', avatarSelector: '.profile__avatar' });

// Создаём экземпляр класса PopupWithImage для попапа с картинкой и устанавливаем слушателей в этот экземпляр 
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// Создаём экземпляр класса PopupWithImage для попапа просмотра аватара (но он ещё не доделан и класс будет другой :) и устанавливаем слушателей в этот экземпляр
const popupViewAvatar = new PopupWithImage('.popup_type_view-avatar');
popupViewAvatar.setEventListeners();

// Создаём новый экземпляр класса PopupWithForm для попапа профиля и устанавливаем слушателей в этот экземпляр
const popupProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
popupProfile.setEventListeners();

// Создаём новый экземпляр класса PopupWithForm для попапа добавления карточки и устанавливаем слушателей в этот экземпляр
const popupCard = new PopupWithForm('.popup_type_card', handleCardFormSubmit);
popupCard.setEventListeners();

// Создаём новый экземпляр класса PopupWithForm для попапа обновления аватара пользователя
const popupNewAvatar = new PopupWithForm('.popup_type_new-avatar', handleNewAvatarFormSubmit);
popupNewAvatar.setEventListeners();

// Создаём новый экземпляр класса PopupWithConfirmation для попапа удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_type_delete-card', handleDeleteCardFormSubmit);
popupDeleteCard.setEventListeners();


// Слушатели (обработчики) событий.
// _______________________________________________________________________________________________________________

// Слушатель, который запускает функцию открытия попапа редактирования профиля по клику на кнопке edit и делает так,  
// чтобы инпуты в форме попапа приняли текстовые значения из блока профиля для имени и професии
popupProfileOpenButtonElement.addEventListener('click', function () {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfileFormValidator.resetValidation();
  popupProfile.open();
});

// Слушатель, который открывает попап добавления карточки по клику на кнопке add
popupCardOpenButtonElement.addEventListener('click', function () {
  popupCardFormValidator.resetValidation();
  popupCard.open();
});

// Слушатель, который открывает попап обновления аватара пользователя
profileImageElement.addEventListener('click', function () {
  popupNewAvatarFormValidator.resetValidation();
  popupNewAvatar.open();
});

// Хотел попробовать сделать ещё один попап для просмотра аватара пользователя, чтобы этот попап открывался 
// по двойному щелчку. Но он, почему-то не открывается))
// Слушатель, который открывает попап просмотра аватара пользователя
profileImageElement.addEventListener('dblclick', function () {
  popupViewAvatar.open(profileNameElement.textContent, profileImageElement.src);
});


// Запуск валидации форм
// _______________________________________________________________________________________________________________

// Запускаем валидацию на форму из попапа профиля
const popupProfileFormValidator = new FormValidator(config, popupProfileFormElement);
popupProfileFormValidator.enableValidation();
popupProfileFormValidator.resetValidation();

// Запускаем валидацию на форму из попапа добавления карточки
const popupCardFormValidator = new FormValidator(config, popupСardFormElement);
popupCardFormValidator.enableValidation();
popupCardFormValidator.resetValidation();

// Запускаем валидацию на форму из попапа обновления аватара пользователя
const popupNewAvatarFormValidator = new FormValidator(config, popupNewAvatarFormElement);
popupNewAvatarFormValidator.enableValidation();
popupNewAvatarFormValidator.resetValidation();

