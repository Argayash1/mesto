class Card {
  constructor(data, templateSelector, handleOpenPopupImage) {
    this._text = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector; // записали селектор в приватное поле 
    this._handleOpenPopupImage = handleOpenPopupImage;
  }
  //Метод, который найдёт по селектору темплейта темплейт-элемент (шаблон карточки), извлечёт его содержимое,
  //в содержимом найдёт элемент с классом card, клонирует его и вернёт клонированный элемент.
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
       // Запишем изображение из темлейта (шаблона) в переменную, т. к. 
    // к нему нужно будет обращаться дважды (задавая атрибуты src и alt).
    this._elementImg = this._element.querySelector('.element__image');

    this._setEventListeners();

    // Добавим данные
    this._elementImg.src = this._link;
    this._elementImg.alt = this._text;
    this._element.querySelector('.element__title').textContent = this._text;

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._elementImg.addEventListener('click', () => {
      this._handleOpenPopupImage(this._text, this._link);
    });
  }

  // добавили метод _handleLikeButtonClick
  _handleLikeButtonClick() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  // добавили метод _handleDeleteButtonClick
  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

}

export {Card}