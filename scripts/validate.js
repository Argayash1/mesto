//Создаём функцию показа ошибки в инпуте (в поле ввода)
const showInputError = (config, form, input, errorMessage) => {
  const {inputErrorClass, errorClass} = config;
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(errorClass);
};

//Создаём функцию скрытия ошибки в инпуте (в поле ввода)
const hideInputError = (config, form, input) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = '' ;
};

//Создаём функцию проверки валидности инпутов (полей ввода)
const checkInputValidity = (config, form, input) => {
  const {inputSelector, formSelector} = config;
  if (!input.validity.valid) {
    showInputError(config, form, input, input.validationMessage);
  } else {
    hideInputError(config, form, input);
  } 
};

//Создаём функцию активирования (раздизэйблить) и деактивирования (задизэйблить) кнопки 
const toggleButton = (config, button) => { // toggleButton()
  if (checkInputValidity) {
      button.classList.remove(config.inactiveButtonClass) // 
      button.disabled = false;
  } else {
      button.classList.add(config.inactiveButtonClass)
      button.disabled = true;
  }
}

//Создаём функцию установки слушателей(обработчиков) на все инпуты
const setEventListeners = (config, form) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
    });
  });
};

//Создаём функцию запуска валидации
const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
      setEventListeners(config, form);
  });
  }

//Вызов функции enableValidation с объектом (config) в качестве аргумента 
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 