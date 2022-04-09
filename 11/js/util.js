const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (min, max) => {
  //Если максимальное значение меньше минимального, меняем их местами
  if (min > max) {
    const swap = max;
    max = min;
    min = swap;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, precision) => {
  //Если максимальное значение меньше минимального, меняем их местами
  if (min > max) {
    const swap = max;
    max = min;
    min = swap;
  }
  return (Math.random() * (max - min) + min).toFixed(precision);
};

const zeroPad = (num, places) => String(num).padStart(places, '0');

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getArrayWithRandomElements = (sourceArray) => {
  const noRepeatArray = [];
  sourceArray.forEach((element) => {
    if (getRandomInteger(0, 1)) {
      noRepeatArray.push(element);
    }
  });
  return noRepeatArray;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, getRandomFloat, zeroPad, getRandomArrayElement, getArrayWithRandomElements, showAlert, isEscapeKey, debounce};
