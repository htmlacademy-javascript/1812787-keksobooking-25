import {showSuccessMessage, showErrorMessage} from './userForm.js';
import {showAlert} from './util.js';

const filterForm = document.querySelector('.map__filters');
const GET_DATA_URL = 'https://25.javascript.pages.academy/keksobooking/data';
const POST_DATA_URL = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch (GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((points) => {
      onSuccess(points);
      filterForm.classList.remove('ad-form--disabled');
    })
    .catch(() => {
      showAlert('Не удалось получть данные с сервера, попробуйте позже');
    });
};

const sendData = (onSuccess, body) => {
  fetch (
    POST_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showSuccessMessage();
      } else {
        showErrorMessage();
      }
    })
    .catch(() => {
      showErrorMessage();
    });
};

export {getData, sendData};
