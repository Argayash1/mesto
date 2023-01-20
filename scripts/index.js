//Импорт массива изображений 
import initialCards from './initialCards.js';
import config from './config.js';
import {Card} from './Сard.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';

//Попап редактирования профиля
const popupProfileElement = document.querySelector('.popup_type_profile'); //Нашли попап редактирования профиля в разметке.
const popupCloseButtons = document.querySelectorAll('.popup__close'); // Нашли все крестики проекта по универсальному селектору
const popupProfileOpenButtonElement = document.querySelector('.profile-info__edit-button'); // Нашли кнопку открытия попапа редактирования профиля.
const profileNameElement = document.querySelector('.profile-info__name'); //Нашли строку с именем профиля в блоке профиля.
const profileProfessionElement = document.querySelector('.profile-info__profession'); //Нашли строку с профессией профиля в блоке профиля.
const popupProfileFormElement = popupProfileElement.querySelector('.popup__form_type_profile'); //Нашли форму в попапе редактирования профиля
const nameInput = popupProfileFormElement.querySelector('input[name="name"]'); //Нашли инпут для имени в форме
const jobInput = popupProfileFormElement.querySelector('input[name="job"]'); //Нашли инпут для профессии в форме
const popupOverlays = document.querySelectorAll('.popup_is-opened'); //Нашли оверлеи для всех попапов 

//Попап добавления карточки
const popupCardElement = document.querySelector('.popup_type_card'); //Нашли попап добавления карточки в разметке.  
const popupCardOpenButtonElement = document.querySelector('.profile__add-button'); // Нашли кнопку открытия попапа добавления карточки
const popupСardFormElement = popupCardElement.querySelector('.popup__form_type_card');
const placeInput = popupСardFormElement.querySelector('input[name="place"]');
const urlInput = popupСardFormElement.querySelector('input[name="url"]');

//Попап показа изображения
const popupImageElement = document.querySelector('.popup_type_image');
const popupImagePhotoElement = popupImageElement.querySelector('.popup__photo');
const popupImageCaptionElement = popupImageElement.querySelector('.popup__caption');

const elementsListElement = document.querySelector('.elements-list'); //Нашли  в HTML-коде блок со списком, куда будут добавляться карточки (пункты/элементы списка).   
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element'); //Нашли в HTML-коде блок с template’ом, а в нём блок с карточкой (пунктом/элементом списка).



//Создаём функцию открытия попапа показа изображения по клике на картинку карточки
function handleOpenPopupImage(name, link) {
  popupImagePhotoElement.src = link;
  popupImagePhotoElement.alt = name;
  popupImageCaptionElement.textContent = name;
  openPopup(popupImageElement);
}

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


// Функция, которая вносит изменения в имя и профессию в блоке профиля, записывая данные которые вписываются в инпуты в попапе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileProfessionElement.textContent = jobInput.value;
  closePopup(popupProfileElement);
}

const handleCardFormSubmit = (e) => {
  e.preventDefault()
  const elementElement = {
    name: placeInput.value,
    link: urlInput.value
  }
  renderElement(elementElement, elementsListElement);
  closePopup(popupCardElement);
  e.target.reset();
  e.submitter.classList.add('popup__save_disabled');
  e.submitter.setAttribute('disabled', true);
}

//Создаём универсальную функцию закрытия попапов
popupCloseButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

//Слушатели (обработчики) событий.
//Слушатель, который запускает функцию открытия попапа редактирования профиля по клику на кнопке edit и делает так,  
//чтобы инпуты в форме попапа приняли текстовые значения из блока профиля для имени и професии
popupProfileOpenButtonElement.addEventListener('click', function () {
  openPopup(popupProfileElement);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileProfessionElement.textContent;
});

//Слушатель, который ззапускает функцию закрытия попапа редактирования профиля по клику на оверлей
popupProfileElement.addEventListener('click', closePopupByClickOnOverlay);

popupProfileFormElement.addEventListener('submit', handleProfileFormSubmit); //Слушатель, который ждет когда в форме попапа (formElement) произойдет событие submit
// затем запускает функцию, которая сохранит новые записи в инпутах формы в попапе и закроет окно попапа

popupCardOpenButtonElement.addEventListener('click', function () {
  openPopup(popupCardElement);
});//Слушатель, который запускает функцию открытия попапа добавления карточки по клику на кнопке add

//Слушатель, который запускает функцию закрытия попапа добавления карточки по клику на оверлей
popupCardElement.addEventListener('click', closePopupByClickOnOverlay);

popupСardFormElement.addEventListener('submit', handleCardFormSubmit);

//popupOverlays.addEventListener('click', closePopupByClickOnOverlay);

//Слушатель, который запускает функцию закрытия попапа просмотра картинки по клику на оверлей
popupImageElement.addEventListener('click', closePopupByClickOnOverlay);

//Запускаем валидацию на форму из попапа профиля
const popupProfileFormValidator = new FormValidator(config, popupProfileFormElement);
popupProfileFormValidator.enableValidation();

//Запускаем валидацию на форму из попапа добавления карточки
const popupCardFormValidator = new FormValidator(config, popupСardFormElement);
popupCardFormValidator.enableValidation();



