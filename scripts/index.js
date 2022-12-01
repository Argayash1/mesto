//Попап редактирования профиля
const popupProfileElement = document.querySelector('.popup_type_profile'); //Нашли попап редактирования профиля в разметке.
const popupProfileCloseButtonElement = popupProfileElement.querySelector('.popup__close_type_profile'); //Нашли кнопку закрытия попапа редактирования профиля.
const popupProfileOpenButtonElement = document.querySelector('.profile-info__edit-button'); // Нашли кнопку открытия попапа редактирования профиля.
const profileNameElement = document.querySelector('.profile-info__name'); //Нашли строку с именем профиля в блоке профиля.
const profileProfessionElement = document.querySelector('.profile-info__profession'); //Нашли строку с профессией профиля в блоке профиля.
const popupProfileFormElement = popupProfileElement.querySelector('.popup__form_type_profile'); //Нашли форму в попапе редактирования профиля
const nameInput = popupProfileFormElement.querySelector('input[name="name"]'); //Нашли инпут для имени в форме
const jobInput = popupProfileFormElement.querySelector('input[name="job"]'); //Нашли инпут для профессии в форме 

//Попап добавления карточки
const popupCardElement = document.querySelector('.popup_type_card'); //Нашли попап добавления карточки в разметке.  
const popupCardOpenButtonElement = document.querySelector('.profile__add-button'); // Нашли кнопку открытия попапа добавления карточки
const popupCardCloseButtonElement = popupCardElement.querySelector('.popup__close_type_card');
const popupСardFormElement = popupCardElement.querySelector('.popup__form_type_card');
const placeInput = popupСardFormElement.querySelector('input[name="place"]');
const urlInput = popupСardFormElement.querySelector('input[name="url"]');

//Попап показа изображения
const popupImageElement = document.querySelector('.popup_type_image');
const popupImageCloseButtonElement = popupImageElement.querySelector('.popup__close_type_image');

//Массив карточек
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
  const popupImagePhoto = elementTemplate.querySelector('.element__image');
  elementDeleteButton.addEventListener('click', handleDeleteButtonClick) //Поставили обраотчик событий на кнопку удаления карточки.
  elementLikeButton.addEventListener('click', handleLikeButtonClick) //Поставили обраотчик событий на кнопку лайка на карточке.
  elementTitle.textContent = item.name;
  elementImg.src = item.link;
  popupImagePhoto.addEventListener('click', handleOpenPopupImage);
  return elementElement;
  };

  const handleOpenPopupImage = (e) => {
    e.target.openPopup(popupImageElement);
    const popupImagePhotoElement = popupImageElement.querySelector('.popup__photo');
    const popupImageCaptionElement = popupImageElement.querySelector('.popup__caption');
    popupImagePhotoElement.src = elementImg.src;
    popupImageCaptionElement.textContent = elementTitle.textContent;
  }

const handleDeleteButtonClick = (e) => {
  e.target.closest('.element').remove()
}

const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('element__like-button_active');
}

const renderElement = (item, wrapElement) => {
  const element = createElement(item)
  wrapElement.prepend(element);
}

//Обработка массива initialCards методом forEach, благодаря которому к каждому элементу массива применяется функция 
//renderElement. Функция renderElement с помощью функции createElement создаёт (отрисовывает) пункт (элемент) списка с уже вставленными  
//туда полями name и link, затем возвращает этот пункт (элемент) списка обратно в функцию renderElement и вставляет этот пункт (элемент) списка 
//непосредственно в HTML-код. А, благодаря применению к каждому элементу массива initialCards метода forEach в HTML-коде создаётся 6 пунктов (элементов) 
// списка, соответственно количеству элементов в массиве (их там 6).  товоснове каждого элемента массива отрисовывает пункт(элемент) списка е  
initialCards.forEach(function(item) {
  renderElement(item, elementsListElement)
})


const openPopup = function (popupElement) {
    popupElement.classList.add('popup_is-opened');
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileProfessionElement.textContent;
} 

//Создаём функцию добавления класса для попапа, чтобы он открывался и чтобы инпуты в форме попапа 
  //приняли текстовые значения из блока профиля для имени и професии

const closePopup = function (popup) {
    popup.classList.remove('popup_is-opened');
} //Создаём функцию удаления класса для попапа, чтобы он закрывался


function ProfileformSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileProfessionElement.textContent = jobInput.value;
  closePopup(popupProfileElement);
} //Функция, которая вносит изменения в имя и профессию в блоке профиля, записывая данные которые вписываются в инпуты в попапе

const CardformSubmitHandler = (e) => {
  e.preventDefault()
  const elementElement = {
    name: placeInput.value,
    link: urlInput.value
}
  renderElement(elementElement, elementsListElement);
  closePopup(popupCardElement);
}



//Слушатели (обработчики) событий.
popupProfileOpenButtonElement.addEventListener('click', function() {
  openPopup(popupProfileElement);
}); //Слушатель, который запускает функцию открытия попапа редактирования профиля по клику на кнопке edit
popupProfileCloseButtonElement.addEventListener('click', function() {
  closePopup(popupProfileElement);
}); //Слушатель, который запускает функцию закрытия попапа редактирования профиля по клику на кнопке close
popupProfileFormElement.addEventListener('submit', ProfileformSubmitHandler); //Слушатель, который ждет когда в форме попапа (formElement) произойдет событие submit
// затем запускает функцию, которая сохранит новые записи в инпутах формы в попапе и закроет окно попапа

popupCardOpenButtonElement.addEventListener('click', function() {
  openPopup(popupCardElement);
});//Слушатель, который запускает функцию открытия попапа добавления карточки по клику на кнопке add
popupCardCloseButtonElement.addEventListener('click', function() {
  closePopup(popupCardElement);
}); //Слушатель, который запускает функцию закрытия попапа добавления карточки по клику close
popupСardFormElement.addEventListener('submit', CardformSubmitHandler);


//Слушатель, который запускает функцию открытия попапа добавления карточки по клику на кнопке add
popupCardCloseButtonElement.addEventListener('click', function() {
  closePopup(popupImageElement);
}); //Слушатель, который запускает функцию закрытия попапа добавления карточки по клику close


