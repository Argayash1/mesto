import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageElement = this._popupElement.querySelector('.popup__photo');
        this._popupCaptionElement = this._popupElement.querySelector('.popup__caption');
      }
      
    open(name, link) {
        this._popupImageElement.src = link;
        this._popupImageElement.alt = name;
        this._popupCaptionElement.textContent = name;
        super.open();
    }
}

export {PopupWithImage}