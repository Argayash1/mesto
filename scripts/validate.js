//Создаём функцию проверки валидности инпутов
const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`)

  if (input.validity.valid) {
      error.textContent = '' ;
      error.classList.remove(config.errorClass);
      input.classList.remove(config.inputErrorClass);
      
  } else {
      error.textContent = input.validationMessage;
      error.classList.add(config.errorClass);
      input.classList.add(config.inputErrorClass);
  }
}

//Создаём функцию активирования (раздизэйблить) и деактивирования (задизэйблить) кнопки 
const toggleButton = (config, inputs, button) => { // toggleButton()
    const isFormValid = inputs.every(input => input.validity.valid)

    if(isFormValid) {
        button.classList.remove(config.inactiveButtonClass) // 
        button.disabled = ''
    } else {
        button.classList.add(config.inactiveButtonClass)
        button.disabled = 'disabled'
    }
}


//Создаём функцию запуска валидации
const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config;
  
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach(form => {
      const inputs = [...form.querySelectorAll(inputSelector)];
      const button = form.querySelector(submitButtonSelector);
  
      form.addEventListener('submit', (e) => {
          e.preventDefault();
      })
  
      inputs.forEach(input => {
          input.addEventListener('input', () => {
              checkInputValidity(input, restConfig);
              toggleButton(restConfig, inputs, button);
          })
      })
  })
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