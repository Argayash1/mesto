import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__save');
        // фиксируем начальный текст кнопки 1 раз в конструкторе
        this._submitButtonText = this._submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();

            // добавим вызов функции _handleFormSubmit
            this._handleFormSubmit(this._card);
        });
    }

    open(card) {
        super.open();
        this._card = card;
    }

    disableSubmitButton() {
        this._submitButton.disabled = true;
    }

    enableSubmitButton() {
        this._submitButton.disabled = false;
    }

    renderLoading(isLoading, loadingText = 'Удаление...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }
}

export { PopupWithConfirmation }