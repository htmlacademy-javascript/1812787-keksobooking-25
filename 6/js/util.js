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

export{getRandomInteger, getRandomFloat, zeroPad, getRandomArrayElement, getArrayWithRandomElements};
