import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();

            // добавим вызов функции _handleFormSubmit
            this._handleFormSubmit();
        });
    }
}

export { PopupWithConfirmation }