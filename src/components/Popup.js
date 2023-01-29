class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    this._popupElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup_is-opened')) {
        this.close();
      }
    })
  }
}

export { Popup }