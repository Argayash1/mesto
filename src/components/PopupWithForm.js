import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        // достаём (находим) элемент формы для того, чтобы в методе close сбросить все инпуты формы (сбросить форму)
        this._form = this._popupElement.querySelector('.popup__form');
        // достаём (находим) все элементы полей
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__save');
        // фиксируем начальный текст кнопки 1 раз в конструкторе
        this._submitButtonText = this._submitButton.textContent;
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

    disableSubmitButton() {
        this._submitButton.disabled = true;
    }

    enableSubmitButton() {
        this._submitButton.disabled = false;
    }

    // Спасибо Вам большое за этот замечательный метод! С удовольствием освоил его и узнал, что, оказывается, 
    // функции можно задавать параметры по умолчанию. В теории в тренажёре об этом, по-моему, не говорилось.
    // указываем 2 параметра (2й с текстом по умолчанию, чтобы не указывать лишний раз его)
    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }
}

export { PopupWithForm }