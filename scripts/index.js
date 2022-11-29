const popupElement = document.querySelector('.popup'); //Нашли попап в разметке
const popupCloseButtonElement = popupElement.querySelector('.popup__close'); //Нашли кнопку закрытия попапа в блоке popup
const popupOpenButtonElement = document.querySelector('.profile-info__edit-button'); // Нашли кнопку открытия попапа
const profileNameElement = document.querySelector('.profile-info__name'); //Нашли строку с именем профиля
const profileProfessionElement = document.querySelector('.profile-info__profession'); //Ищем строку с профессией профиля
const formElement = popupElement.querySelector('.popup__form'); //Нашли форму в блоке popup
const nameInput = formElement.querySelector('input[name="name"]'); //Нашли инпут для имени в форме
const jobInput = formElement.querySelector('input[name="job"]'); //Нашли инпут для профессии в форме 

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

const elementsListElement = document.querySelector('.elements-list'); //Нашли  в HTML-коде блок со списком, куда будут добавляться карточки (пункты/элементы списка).   
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element'); //Нашли в HTML-коде блок с template’ом, а в нём блок с карточкой (пунктом/элементом списка).

function createElement(item) {
  const elementElement = elementTemplate.cloneNode(true); //Записали template в переменную elementElement и клонировали его.
  const elementTitle = elementElement.querySelector('.element__title'); //Нашли  в HTML-коде элемент с заголовком карточки (пункта/элемента списка).
  const elementImg = elementElement.querySelector('.element__image'); //Нашли  в HTML-коде элемент с изображением карточки (пункта/элемента списка).
  const elementDeleteButton = elementElement.querySelector('.element__delete-button'); //Нашли  в HTML-коде элемент кнопки "Удалить".
  const elementLikeButton = elementElement.querySelector('.element__like-button'); //Нашли  в HTML-коде элемент кнопки "Лайк".
  elementDeleteButton.addEventListener('click', handleDeleteButtonClick) //Поставили обраотчик событий на кнопку удаления карточки.
  elementLikeButton.addEventListener('click', handleLikeButtonClick) //Поставили обраотчик событий на кнопку лайка на карточке.
  elementTitle.textContent = item.name;
  elementImg.src = item.link;
  return elementElement;
}

const handleDeleteButtonClick = (e) => {
  e.target.closest('.element').remove()
}

const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('element__like-button_active');
}

const renderElement = (item, wrapElement) => {
  const element = createElement(item)
  wrapElement.append(element);
}

initialCards.forEach(function(item) {
  renderElement(item, elementsListElement)
})


const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileProfessionElement.textContent;
} //Создаём функцию добавления класса для попапа, чтобы он открывался и чтобы инпуты в форме попапа 
  //приняли текстовые значения из блока профиля для имени и професии

const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
} //Создаём функцию удаления класса для попапа, чтобы он закрывался

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileProfessionElement.textContent = jobInput.value;
    closePopup();
} //Функция, которая вносит изменения в имя и профессию в блоке профиля, записывая данные которые вписываются в инпуты в попапе

popupOpenButtonElement.addEventListener('click', openPopup); //Слушатель, который запускает функцию открытия попапа по клику на кнопке edit
popupCloseButtonElement.addEventListener('click', closePopup); //Слушатель, который запускает функцию закрытия попапа по клику close
formElement.addEventListener('submit', formSubmitHandler); //Слушатель, который ждет когда в форме попапа (formElement) произойдет событие submit
// затем запускает функцию, которая сохранит новые записи в инпутах формы в попапе и закроет окно попапа




