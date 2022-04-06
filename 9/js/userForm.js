import {sendData} from './load.js';
import {isEscapeKey} from './util.js';
import {setMainMarker, setDefaultNoUiSlider} from './userFormStartPage.js';

const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  //successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__element',
  //errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

const submitButton = form.querySelector('.ad-form__submit');
const roomField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');
const capacityOptions = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

function validateCapacity () {
  return capacityOptions[roomField.value].includes(capacityField.value);
}

function getRoomErrorMessage () {
  if (capacityField.value === '1') {
    return `
  Вариант не доступен для ${capacityField.value} гостя
  `;
  }
  if (capacityField.value === '2' || capacityField.value === '3') {
    return `
  Вариант не доступен для ${capacityField.value} гостей
  `;
  } else {
    return `
    Вариант не доступен не для гостей
    `;
  }
}

function getCapacityErrorMessage () {
  if (capacityField.value === '0') {
    return 'Доступно только для гостей';
  }
  return `
    Для
    ${capacityField.value} гостей
    ${roomField.value === '1' ? 'не доступна' : 'не доступны'}
    ${roomField.value}
    ${roomField.value === '1' ? 'комната' : 'комнаты'}
  `;
}

pristine.addValidator(roomField, validateCapacity, getRoomErrorMessage);
pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

function onRoomChange () {
  pristine.validate(validateCapacity);
}

form
  .querySelectorAll('[name="rooms"]')
  .forEach((item) => item.addEventListener('change', onRoomChange));

form
  .querySelectorAll('[name="capacity"]')
  .forEach((item) => item.addEventListener('change', onRoomChange));

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

const successMessageTemplate = document.querySelector('#success').content.querySelector('div');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('div');
const messagePlace = document.querySelector('.ad-form');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);
const tryAgainButton = errorMessage.querySelector('.error__button');
const resetButton = form.querySelector('.ad-form__reset');

function onMessageEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successMessage.remove(messagePlace);
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onMessageClickClose);
  }
}

function onMessageClickClose (evt) {
  evt.preventDefault();
  successMessage.remove(messagePlace);
  document.removeEventListener('click', onMessageClickClose);
  document.removeEventListener('keydown', onMessageEscKeydown);
}

function showSuccessMessage () {
  messagePlace.append(successMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClickClose);
}

function showErrorMessage () {
  messagePlace.append(errorMessage);
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  unblockSubmitButton();
}
function onTryAgainButtonClick () {
  errorMessage.remove(messagePlace);
  tryAgainButton.removeEventListener('click', onTryAgainButtonClick);
}

const resetPage = () => {
  document.querySelector('.map__filters').reset();
  document.querySelector('.ad-form').reset();
  const leafleatPopup = document.querySelector('.leaflet-popup');
  if (leafleatPopup) {leafleatPopup.remove();}
  setMainMarker();
  setDefaultNoUiSlider();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

export {setUserFormSubmit, resetPage, showSuccessMessage, showErrorMessage, pristine};
