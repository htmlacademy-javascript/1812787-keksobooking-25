function getRandomInteger (min, max) {
  //Если максимальное значение меньше минимального, меняем их местами
  if (min > max) {
    const swap = max;
    max = min;
    min = swap;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInteger(2, 10);

function getRandomFloat (min, max, precision) {
  //Если максимальное значение меньше минимального, меняем их местами
  if (min > max) {
    const swap = max;
    max = min;
    min = swap;
  }
  return (Math.random() * (max - min) + min).toFixed(precision);
}

getRandomFloat(1.1, 1.5, 3);
