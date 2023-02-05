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
import { Api } from '../components/Api.js';
import './index.css';

// Попап редактирования профиля
const popupProfileElement = document.querySelector('.popup_type_profile'); // Нашли попап редактирования профиля в разметке.
const popupProfileOpenButtonElement = document.querySelector('.profile-info__edit-button'); // Нашли кнопку открытия попапа редактирования профиля.
const popupProfileFormElement = popupProfileElement.querySelector('.popup__form_type_profile'); //Нашли форму в попапе редактирования профиля
const nameInput = popupProfileFormElement.querySelector('input[name="name"]'); //Нашли инпут для имени в форме
const jobInput = popupProfileFormElement.querySelector('input[name="about"]'); //Нашли инпут для профессии в форме

// Попап добавления карточки
const popupCardElement = document.querySelector('.popup_type_card'); // Нашли попап добавления карточки в разметке.  
const popupCardOpenButtonElement = document.querySelector('.profile__add-button'); // Нашли кнопку открытия попапа добавления карточки
const popupСardFormElement = popupCardElement.querySelector('.popup__form_type_card'); //Нашли форму в попапе добавления карточки

// Попап обновления аватара
const popupNewAvatarElement = document.querySelector('.popup_type_new-avatar'); // Нашли попап добавления карточки в разметке.
const profileImageElement = document.querySelector('.profile__avatar');


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
  .then((res) => {
    userInfo.setUserInfo(res[0]); // С помощью публичного метода setUserInfo класса UserInfo
    cardList.renderItems(res[1]); // С помощью публичного метода renderItems класса Section добавляем готовые
    // DOM-элементы всех карточек в контейнер
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


// Создание карточек
// _______________________________________________________________________________________________________________

// Создаём функцию генерации (создания) карточки
const createCard = (item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '#element-template', handleCardClick, handleOpenPopupDeleteCard, handleLikeClick, handleLDeleteikeClick);

  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  return cardElement;
}

// Создаём эеземпляр класса Section, то есть списка карточек: 
// 1. С помощью функции createCard cоздаём и сохранякем в переменную карточку на основе объекта из 
// импортированного массива initialCards, который содержит объекты с полями name и link
// 2. Вставляем уже созданный функцией createCard готовый DOM-элемент карточки в список карточек (контейнер 
// с карточками) 
const cardList = new Section({
  renderer: (item) => {    
    // С помощью публичного метода addItem класса Section добавляем готовый DOM-элемент карточки в контейнер,
    // в качестве аргумента передаём вызов функции createCard, которая создаёт новую карточку и готовит её к 
    // публикации (т. е. создаёт уже готовый DOM-элемент карточки)
    cardList.addItem(createCard(item));
  },
},
  '.elements-list'
);


// Функции для попапов
// _______________________________________________________________________________________________________________

// Создаём функцию открытия попапа показа изображения по клике на картинку карточки
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

// Создаём функцию открытия попапа удаления карточки по клике на кнопку удаления карточки
let initialCard = {};
let idOfCard = {}
function handleOpenPopupDeleteCard(cardElement, cardId) {
  popupDeleteCard.open();
  initialCard = cardElement;
  idOfCard = cardId;
}

// Создаём функцию сабмита для попапа профиля, которая вносит изменения в имя и профессию в блоке профиля, записывая 
// данные которые вписываются пользователем в инпуты в попапе профиля
const handleProfileFormSubmit = (formValues) => {
  popupProfile.waitForTheLoad();
  api.editProfile(formValues)
    .then((formValues) => {
      userInfo.setUserInfo(formValues);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => { // В любом случае
      popupProfile.loadIsFinished();
    });
}

// Создаём функцию сабмита для попапа добавления карточки
const handleCardFormSubmit = (formValues) => {
  popupCard.waitForTheLoad();
  api.addNewCard(formValues)
    .then((formValues) => {
      cardList.addItem(createCard(formValues));
      popupCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => { // В любом случае
      popupCard.loadIsFinished();
    });
}

// Создаём функцию сабмита попапа для удаления карточки
const handleDeleteCardFormSubmit = () => {
  api.deleteCard(idOfCard)
  .then(() => {
    initialCard.remove();
    popupDeleteCard.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
}

// Создаём функцию сабмита попапа для обновления аватара пользователя
const handleNewAvatarFormSubmit = (formValues) => {
  popupNewAvatar.waitForTheLoad();
  api.addNewAvatar(formValues)
    .then((formValues) => {
      profileImageElement.src = formValues.avatar;
      popupNewAvatar.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => { // В любом случае
      popupNewAvatar.loadIsFinished();
    });
}


// Функции постановки и снятие лайка
// _______________________________________________________________________________________________________________

// Создаём функцию постановки лайка
const handleLikeClick = (likeButtonElement, cardId, countOfLikes) => {
  api.setLike(cardId)
  .then((res) => {
    likeButtonElement.classList.add('element__like-button_active');
    setCountOfLikes(res, countOfLikes);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
}

// Создаём функцию снятия лайка
const handleLDeleteikeClick = (likeButtonElement, cardId, countOfLikes) => {
  api.deleteLike(cardId)
  .then((res) => {
    likeButtonElement.classList.remove('element__like-button_active');
    setCountOfLikes(res, countOfLikes);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
}

// Создаём функцию установки значения счётчика лайков
const setCountOfLikes = (res, countOfLikes) => {
  countOfLikes.textContent = res.likes.length;
}

// Создание экземпляров классов для попапов
// _______________________________________________________________________________________________________________

// Создаём новый экземпляр класса UserInfo 
const userInfo = new UserInfo({ nameSelector: '.profile-info__name', infoSelector: '.profile-info__profession', avatarSelector: '.profile__avatar' });

// Создаём экземпляр класса PopupWithImage для попапа с картинкой и устанавливаем слушателей в этот экземпляр 
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// Создаём новый экземпляр класса PopupWithForm для попапа профиля и устанавливаем слушателей в этот экземпляр
const popupProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
popupProfile.setEventListeners();

// Создаём новый экземпляр класса PopupWithForm для попапа добавления карточки и устанавливаем слушателей в этот экземпляр
const popupCard = new PopupWithForm('.popup_type_card', handleCardFormSubmit);
popupCard.setEventListeners();

// Создаём новый экземпляр класса PopupWithConfirmation для попапа удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_type_delete-card', handleDeleteCardFormSubmit);
popupDeleteCard.setEventListeners();

// Создаём новый экземпляр класса PopupWithForm для попапа обновления аватара пользователя
const popupNewAvatar = new PopupWithForm('.popup_type_new-avatar', handleNewAvatarFormSubmit);
popupNewAvatar.setEventListeners();


// Слушатели (обработчики) событий.
// _______________________________________________________________________________________________________________

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

// Слушатель, который открывает попап обновления аватара пользователя
profileImageElement.addEventListener('click', function () {
  popupNewAvatarFormValidator.resetValidation();
  popupNewAvatar.open();
});

profileImageElement.addEventListener('mouseover', function() {
  profileImageElement.classList.add('');
})


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
const popupNewAvatarFormValidator = new FormValidator(config, popupNewAvatarElement);
popupNewAvatarFormValidator.enableValidation();
popupNewAvatarFormValidator.resetValidation();

