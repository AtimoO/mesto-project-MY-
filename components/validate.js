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

const toggleButtonState = (inputList, buttonElement, optionsForm) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(optionsForm.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(optionsForm.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    return !inputElement.validity.valid; // !inputElement.value.trim().length
  });
};

const setEventListeners = (formElement, optionsForm) => {
  const inputList = Array.from(
    formElement.querySelectorAll(optionsForm.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    optionsForm.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, optionsForm);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, optionsForm);
      toggleButtonState(inputList, buttonElement, optionsForm);
    });
  });
};

const enableValidation = (optionsForm) => {
  const formList = Array.from(
    document.querySelectorAll(optionsForm.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(optionsForm.formFieldsetSelector)
    );
    fieldsetList.forEach((fieldsetElement) => {
      setEventListeners(fieldsetElement, optionsForm);
    });
  });
};

export { enableValidation };
