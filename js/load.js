import {createMarker} from './userFormStartPage.js';
import {showSuccessMessage, showErrorMessage} from './userForm.js';
import {showAlert} from './util.js';

const getData = () => {
  fetch ('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((points) => {
      points.forEach((point) => createMarker(point));
    })
    .catch(() => {
      showAlert('Не удалось получть данные с сервера, попробуйте позже');
    });
};

const sendData = (onSuccess, body) => {
  fetch (
    'https://25.javascript.pages.academy/keksobooking',
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
