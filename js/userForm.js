const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  //successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__element',
//errorTextTag: 'span',
// errorTextClass: 'ad-form__error-text',
});

const roomField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');
const capacityOptions = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей'],
};

function validateCapacity () {
  return capacityOptions[roomField.value].includes(capacityField.value);
}

function getRoomErrorMessage () {
  return `
  Вариант не доступен ${capacityField.value}
  `;
}

function getCapacityErrorMessage () {
  const upperStr = capacityField.value[0].toUpperCase() + capacityField.value.slice(1);
  return `
    ${upperStr}
    ${roomField.value === '1 комната' ? 'не доступна' : 'не доступны'}
    ${roomField.value}
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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
