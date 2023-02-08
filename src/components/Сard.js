class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, userID) {
    this._text = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;
    this._userID = userID;
    this._templateSelector = templateSelector; // записали селектор в приватное поле 
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._countOfLikes = this._element.querySelector('.element__count-likes');

    this._setEventListeners();
    this._handleRemoveDeleteButton();
    this.isLiked();
    this._toggleLikeButton();
    this._showCountofLikes();

    // Добавим данные
    this._elementImg.src = this._link;
    this._elementImg.alt = this._text;
    this._element.querySelector('.element__title').textContent = this._text;

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeButton.addEventListener('click', () => {
      // this._toggleLikeButton();
      this.isLiked(this._likes);
      this._handleLikeClick(this._id, this);
      //console.log(e);
      // this._toggleLikeButton(e);
    });

    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._element, this._id);
      //this._getSubmitCallBack(handleDeleteCardFormSubmit);
    });

    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._text, this._link);
    });
  }

  // добавили метод _handleLikeButtonClick
  handleLikeButtonClick = () => {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  // добавили метод _handleDeleteButtonClick
  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  _handleRemoveDeleteButton() {
    if (this._ownerId != this._userID) {
      this._deleteButton.classList.add('element__delete-button_hide');
    }
  }

  _showCountofLikes() {
    this._countOfLikes.textContent = this._likes.length;
  }

  _toggleLikeButton = () => {
    if (this.isLiked()) {
      this.handleLikeButtonClick();
    }
  }

  isLiked() {
    const isLikedByMe = this._likes.some(like => like._id === this._userID);
    return isLikedByMe
  }
  
  setLikesValue(likes) {
    this._likes=likes;
    this._countOfLikes.textContent = likes.length;
  }
}



export { Card }