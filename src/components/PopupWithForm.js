import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        // достаём (находим) элемент формы для того, чтобы в методе close сбросить все инпуты формы (сбросить форму)
        this._form = this._popupElement.querySelector('.popup__form');
        // достаём (находим) все элементы полей
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        // создаём пустой объект
        const formValues = {};

        // добавляем в этот объект значения всех полей (инпутов), обойдя все поля (инпуты) по свойству (полю) name,
        // то есть в объекте this._formValues  
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
        
            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._getInputValues());
        });        
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export {PopupWithForm}