const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  optionsForm
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(optionsForm.inputErrorInvalid);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(optionsForm.errorClass);
};

const hideInputError = (formElement, inputElement, optionsForm) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(optionsForm.inputErrorInvalid);
  errorElement.classList.remove(optionsForm.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, optionsForm) => {
  if (!inputElement.validity.valid) {
    // !inputElement.value.trim().length - проверка пустоты
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      optionsForm
    );
  } else {
    hideInputError(formElement, inputElement, optionsForm);
  }
};

//Переключатель состояние кнопки
const toggleButtonState = (inputList, buttonElement, optionsForm) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // если не валид кнопка неактив
    buttonElement.classList.add(optionsForm.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    // если актив
    buttonElement.classList.remove(optionsForm.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

// Блокируем кнопку отправки формы
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    return !inputElement.validity.valid; // !inputElement.value.trim().length
  });
};

// Добавление обработчиков всем полям формы
const setEventListeners = (formElement, optionsForm) => {
  // Находим все поля внутри формы,
  const inputList = Array.from(
    formElement.querySelectorAll(optionsForm.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    optionsForm.submitButtonSelector
  );
  // Это проверит состояние кнопки при первой загрузке страницы. Тогда кнопка перестанет быть активной до ввода данных в одно из полей.
  toggleButtonState(inputList, buttonElement, optionsForm);
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, optionsForm);
      toggleButtonState(inputList, buttonElement, optionsForm);
    });
  });
};

const enableValidation = (optionsForm) => {
  // Найдём все формы в DOM
  const formList = Array.from(
    document.querySelectorAll(optionsForm.formSelector)
  );
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log(formElement);
    });
    // Для каждой формы вызовем функцию setEventListeners
    const fieldsetList = Array.from(
      formElement.querySelectorAll(optionsForm.formFieldsetSelector)
    );
    fieldsetList.forEach((fieldsetElement) => {
      setEventListeners(fieldsetElement, optionsForm);
    });
  });
};

export { enableValidation };
