//Создаём функцию показа ошибки в инпуте (в поле ввода)
const showInputError = (config, form, input, errorMessage) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(config.errorClass);
};

//Создаём функцию скрытия ошибки в инпуте (в поле ввода)
const hideInputError = (config, form, input) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = '';
};

//Создаём функцию проверки валидности инпутов (полей ввода)
const checkInputValidity = (config, form, input) => {
  if (!input.validity.valid) {
    showInputError(config, form, input, input.validationMessage);
  } else {
    hideInputError(config, form, input);
  }
};

//Создаём функцию установки слушателей(обработчиков) на все инпуты
const setEventListeners = (config, form) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(config, form, input);
      toggleButtonState(config, inputs, button);
    });
  });
};

//Создаём функцию запуска валидации
const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => {
    setEventListeners(config, form);
  });
};

//Создаём функцию проверки ВСЕХ инпутов на валидность (она отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».)
// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
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
const toggleButtonState = (config, inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//Вызов функции enableValidation с объектом (config) в качестве аргумента 
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 