const popupElement = document.querySelector('.popup'); //Нашли попап в разметке
const popupCloseButtonElement = popupElement.querySelector('.popup__close'); //Нашли кнопку закрытия попапа в блоке popup
const popupOpenButtonElement = document.querySelector('.profile-info__edit-button'); // Нашли кнопку открытия попапа
const profileNameElement = document.querySelector('.profile-info__name'); //Нашли строку с именем профиля
const profileProfessionElement = document.querySelector('.profile-info__profession'); //Ищем строку с профессией профиля
const formElement = popupElement.querySelector('.popup__form'); //Нашли форму в блоке popup
const nameInput = formElement.querySelector('input[name="name"]'); //Нашли инпут для имени в форме
const jobInput = formElement.querySelector('input[name="job"]'); //Нашли инпут для профессии в форме 

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




