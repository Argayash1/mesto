class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    };

    //Создаём функцию показа ошибки в инпуте (в поле ввода)
    _showInputError(input, errorMessage) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        error.textContent = errorMessage;
        error.classList.add(this._errorClass);
    };

    //Создаём функцию скрытия ошибки в инпуте (в поле ввода)
    _hideInputError(input) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        error.classList.remove(this._errorClass);
        error.textContent = '';
    };

    //Создаём функцию проверки валидности инпутов (полей ввода)
    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        } else {
            this._hideInputError(input);
        }
    };

    //Создаём функцию установки слушателей(обработчиков) на все инпуты
    _setEventListeners() {
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState(this._inputList, this._submitButton);
            });
        });
    };

    //Создаём функцию запуска валидации
    enableValidation() {
        this._setEventListeners();
    };

    //Создаём функцию проверки ВСЕХ инпутов на валидность (она отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».)
    // Функция принимает массив полей
    _hasInvalidInput(inputList) {
        // проходим по этому массиву методом some
        return inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернёт true

            return !inputElement.validity.valid;
        })
    };

    //Создаём функцию активирования (раздизэйблить) и деактивирования (задизэйблить) кнопки 
    // Функция принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять
    _toggleButtonState(inputList, buttonElement) {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
            // сделай кнопку неактивной
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            // иначе сделай кнопку активной
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    disableSubmitButton() {
         // сделай кнопку неактивной
         this._submitButton.classList.add(this._inactiveButtonClass);
         this._submitButton.disabled = true;
    }
}

export { FormValidator }