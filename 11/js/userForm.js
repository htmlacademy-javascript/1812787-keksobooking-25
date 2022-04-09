import {sendData} from './load.js';
import {isEscapeKey} from './util.js';
import {setMainMarker} from './userFormStartPage.js';

const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const sliderElement = document.querySelector('.ad-form__slider');
const submitButton = form.querySelector('.ad-form__submit');
const roomField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');
const priceField = form.querySelector('[name="price"]');
const houseTypeField = form.querySelector('[name="type"]');
const checkInTime = form.querySelector('[name="timein"]');
const checkOutTime = form.querySelector('[name="timeout"]');

const capacityOptions = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};
const defaultPriceValue = priceField.getAttribute('placeholder');

const minPriceOfHouseType = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const timeCheck = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00',
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return parseInt(value, 10);
    },
    from: function (value) {
      return parseInt(value, 10);
    }
  },
});

//валидация

function validateMinPrice () {
  return priceField.value >= minPriceOfHouseType[houseTypeField.value];
}

function getTypeOfHouseErrorMessage () {
  return `Минимальная стоимость выбранного типа жилья ${minPriceOfHouseType[houseTypeField.value]}`;
}

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
pristine.addValidator(priceField, validateMinPrice, getTypeOfHouseErrorMessage);

function onRoomChange () {
  pristine.validate(validateCapacity);
}

function onTypeOfHouseChange () {
  pristine.validate(validateMinPrice);
}

function setTimeCheckIn () {
  checkInTime.value = timeCheck[checkOutTime.value];
}

function setTimeCheckOut () {
  checkOutTime.value = timeCheck[checkInTime.value];
}

roomField.addEventListener('change', onRoomChange);
capacityField.addEventListener('change', onRoomChange);
priceField.addEventListener('change', onTypeOfHouseChange);
houseTypeField.addEventListener('change', onTypeOfHouseChange);
checkOutTime.addEventListener('change', setTimeCheckIn);
checkInTime.addEventListener('change', setTimeCheckOut);

sliderElement.noUiSlider.on('slide', () => {
  priceField.value = sliderElement.noUiSlider.get();
  pristine.validate();
});

priceField.addEventListener('input', () => {
  sliderElement.noUiSlider.set(priceField.value);
  pristine.validate();
});

const setDefaultNoUiSlider = () => {
  sliderElement.noUiSlider.set(defaultPriceValue);
};

//блокировка кнопок отправки формы

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

//отправка формы

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
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);
const tryAgainButton = errorMessage.querySelector('.error__button');
const resetButton = form.querySelector('.ad-form__reset');

//сообщения об отправке формы

function onMessageEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successMessage.remove(form);
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onMessageClickClose);
  }
}

function onMessageClickClose (evt) {
  evt.preventDefault();
  successMessage.remove(form);
  document.removeEventListener('click', onMessageClickClose);
  document.removeEventListener('keydown', onMessageEscKeydown);
}

function showSuccessMessage () {
  form.append(successMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClickClose);
}

function showErrorMessage () {
  form.append(errorMessage);
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  unblockSubmitButton();
}
function onTryAgainButtonClick () {
  errorMessage.remove(form);
  tryAgainButton.removeEventListener('click', onTryAgainButtonClick);
}

//очистка формы

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

//фильтрация

const priceRange = {
  low: 10000,
  high: 50000,
};

const filterPoint = (point) => {

  const houseTypeInput = document.querySelector('[name="housing-type"]');
  const housePriceInput = document.querySelector('[name="housing-price"]');
  const houseRoomInput = document.querySelector('[name="housing-rooms"]');
  const houseGuestsInput = document.querySelector('[name="housing-guests"]');
  const houseFeaturesCheck = document.querySelectorAll('.map__features input[type="checkbox"]:checked');

  let isMatched = true;

  if (houseTypeInput.value !== 'any' && point.offer.type !== houseTypeInput.value) {
    isMatched = false;
    return isMatched;
  }

  let span;
  if (point.offer.price < priceRange.low) {span = 'low'; }
  if (point.offer.price >= priceRange.low && point.offer.price < priceRange.high) {span = 'middle'; }
  if (point.offer.price >= priceRange.high) {span = 'heigh'; }

  if (housePriceInput.value !== 'any' && span !== housePriceInput.value) {
    isMatched = false;
    return isMatched;
  }

  if (houseRoomInput.value !== 'any' && point.offer.rooms !== Number(houseRoomInput.value)) {
    isMatched = false;
    return isMatched;
  }

  if (houseGuestsInput.value !== 'any' && point.offer.guests !== Number(houseGuestsInput.value)) {
    isMatched = false;
    return isMatched;
  }

  if  (!('features' in point.offer)) {
    isMatched = false;
    return isMatched;
  } else {
    houseFeaturesCheck.forEach((houseFeature) => {
      if (!(point.offer.features.includes(houseFeature.value))) {
        isMatched = false;
        return isMatched;
      }
    });
  }

  return isMatched;
};

export {setUserFormSubmit, resetPage, showSuccessMessage, showErrorMessage, filterPoint};
