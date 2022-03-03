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

const NAMES = [
  'Эко-отель Priroda',
  'Усадьба У горы',
  'Апарт-отель',
  'Отель',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_OPTIONS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHARACTERISTICS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_ADS_COUNT = 10;

const zeroPad = (num, places) => String(num).padStart(places, '0');

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getNoRepeatArray = (sourceArray) => {
  const noRepeatArray = [];
  sourceArray.forEach((element) => {
    if (getRandomInteger(0, 1)) {
      noRepeatArray.push(element);
    }
  });
  return noRepeatArray;
};

const createAuthor = (i) => ({
  avatar: `img/avatars/user${zeroPad(i+1, 2)}.png`,
});

const createOffer = (location) => ({
  title: getRandomArrayElement(NAMES),
  address: `${location.lat}, ${location.lng}`,
  price: getRandomInteger(1000, 100000),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomInteger(1, 5),
  guests: getRandomInteger(1, 10),
  checkin: getRandomArrayElement(TIME_OPTIONS),
  checkout: getRandomArrayElement(TIME_OPTIONS),
  features: getNoRepeatArray(CHARACTERISTICS),
  description: 'Здесь будет описание объекта',
  photos: getNoRepeatArray(PHOTOS),
});

const createLocation = () => ({
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5),
});

const createAdv = (i, location) => ({
  author: createAuthor(i),
  offer: createOffer(location),
  location: location,
});

const similarAds = Array.from({length: SIMILAR_ADS_COUNT}, (_, i) => createAdv(i, createLocation()));

similarAds();
